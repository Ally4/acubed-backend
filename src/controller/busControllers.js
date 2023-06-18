import Model from '../database/models'
import helperFunction from '../utils/generateDefaultRole'
import { paginate } from 'paginate-info'
import message from '../utils/messageMocks'
import controlAssign from '../utils/controlAssignBus'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

const { Route, Bus,User } = Model
class busController {
    static async createNewBus(req, res) {
        try {
            const { plate, company, seats, status, type, location } = req.body
            const category = helperFunction.classifyBus(seats)
            const availableSeats = seats 
            const commuters=0
            const bus = await Bus.create({
                plate, company, seats, status, type, location, category, commuters, availableSeats
            });
            return res.status(201).json({
                bus
            });
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't add new bus")
            })
        }
    }

    static async getAllBus(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            const { rows, count } = await Bus.findAndCountAll({
                page, limit, offset,
                order: [
                    ['id', 'asc']
                ]
            });
            const pagination = paginate(page, count, rows, limit);

            if (offset >= count) {
                return res.status(404).json({
                    message: res.__("page not found")
                })
            }
            return res.status(200).json({
                pagination,
                rows
            })
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't get buses")
            })
        }
    }

    static async getBus(req, res) {
        try {
            const {id} = req.params
            const findBus = await Bus.findByPk(id)
            
            return res.status(200).json({ findBus })
        } catch (error) {
            return res.status(500).json({
                message: res.__("Bus with") + ` id = ${req.params.id} ` + res.__("not found")
            })
        }
    }

    static async updateBus(req, res) {
        try {
            const { plate, company, seats, status, type, location } = req.body
            const category = helperFunction.classifyBus(req.body.seats)

            const updated = await Bus.update(
                { plate, company, seats, status, type, location, category },
                {
                    where: { id: req.params.id }
                })

            if (updated) {
                const updatedBus = await Bus.findByPk(req.params.id)
                return res.status(200).json({
                    updatedBus
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't update bus")
            })
        }
    }

    static async deleteBus(req, res) {
        await Bus.destroy({ where: { id: req.params.id } })
        return res.status(200).json({
            message: res.__("Deleted successfully")
        })
    }

    static async assignDriver(req, res) {

        try {
            const user = await Model.User.findOne({
                where: { email: req.body.email },
            });


            const updated = await Model.Bus.update({ userId: user.id },
                { where: { id: req.params.id } }
            );
            if (updated) {
                const bus = await Model.Bus.findOne({
                    where: { id: req.params.id },
                    include: [{
                        model: Model.User,
                        as: 'driver',
                        attributes: ["id", "name", "email"]
                    }]
                });

                const Options = {
                    userEmail: req.body.email,
                    subject: 'Phantom assignment',
                    message: message.assignMessage(user.name, bus.plate)
                }

                controlAssign.controlAssignment(Options, bus, res)
            }

        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    static async unassignDriver(req, res) {
        try {
            const updated = await Bus.update({ userId: null },
                { where: { id: req.params.id } }
            );

            if (updated) {
                const bus = await Bus.findOne({
                    where: { id: req.params.id },
                });

                const Options = {
                    userEmail: req.body.email,
                    subject: 'Phantom Unassignment',
                    message: message.unassignMessage(req.user.name, bus.plate)
                }

                controlAssign.controlAssignment(Options, bus, res)
            }
        } catch (error) {
            return res.status(500).json({ message: res.__('can not unassign') })
        }
    }

    static async getAssignedBuses(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            const { rows, count } = await Bus.findAndCountAll({
                page, limit, offset,
                where: { userId: { [Op.ne]: null } },
                include: [{
                    model: User,
                    as: 'driver',
                    attributes: ["id", "name", "email"]
                }],
                order: [
                    ['id', 'asc']
                ]
            });
            const pagination = paginate(page, count, rows, limit);
            if (offset >= count) {
                return res.status(404).json({
                    message: res.__("page not found")
                })
            }
            return res.status(200).json({
                pagination,
                rows
            })
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't get buses")
            })
        }
    }

    static async viewListOfBuses(req,res){
        try {
        const buses = await Bus.findAll({
            where:{ routeId: req.route.id },
            order: [ ['status', 'asc'] ]
        })
        return res.status(200).json({
            buses
        })
            
        } catch (error) {
           return res.status(500).json({
                error:res.__('This route  does not exist')
            })    
        }

    }

    static async assignRoute(req, res){
        try {
            const findRoute= req.route.id
            const updated = await Bus.update({ routeId:findRoute },
                { where: { id: req.params.id } });

            if (updated) {
                const assignedBus= await Bus.findOne({
                    where: { id:req.params.id },
                    include: [{
                        model: Route,
                        as: 'route',
                        attributes:["id","name","routeID"]
                    }]
                });
                return res.status(200).json({ bus: assignedBus })
            }
        } catch (error) {
            return res.status(500).json({ message: res.__("can't assign bus to route") })
        }
    }

    static async unassignRoute(req,res){
        try{
            const { id } = req.params

            const busAssigned = await Bus.findOne({
                where: {routeId: req.route.id, id}                             
            })

            if(!busAssigned){
                return res.status(401).json({
                    message: res.__("Bus is not assigned to the route ") + '<' + req.route.name + '>'
                })
            }
            
            const unassignedBus = await Bus.update({ routeId:null}, { where: { id } })
            
            if(unassignedBus){
                const findUnassignedBus = await Bus.findByPk(id)
                return res.status(200).json({ findUnassignedBus })
            }
        
        } catch (error){
            return res.status(500).json({ message: res.__("can't unassign bus to route") })
        }
    }
    
    static async getAssignedBusesToRoutes(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            const { rows, count } = await Bus.findAndCountAll({
                page, limit, offset,
                where: { routeId: { [Op.ne]: null } },
                include: [{
                    model: Route,
                    as: 'route',
                    attributes:["id","name","routeID"]
                }],
                order: [
                    ['id', 'asc']
                ]
            });
            const pagination = paginate(page, count, rows, limit);
            if (offset >= count) {
                return res.status(404).json({
                    message: res.__("page not found")
                })
            }
            return res.status(200).json({
                pagination,
                rows
            })
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't get buses")
            })
        }
    }
}

export default busController
