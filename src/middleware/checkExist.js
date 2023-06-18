import Model from '../database/models'
import Sequelize from 'sequelize'
const Op = Sequelize.Op
const {Bus,User,Route} = Model

exports.checkBusID = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const buses = await Bus.findAll()
    const IDs = buses.map(bus => bus.id)
    if (!IDs.includes(id)) {
        return res.status(404).json({
            message: res.__("bus doesn't exist")
        })
    }
    next()
}

exports.checkRouteID = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const routes = await Route.findAll()
    const IDs = routes.map(route => route.id)
    if (!IDs.includes(id)) {
        return res.status(404).json({
            message: res.__("route doesn't exist")
        })
    }
    next()
}

exports.checkPlate = async (req, res, next) => {
    const findPlate = await Bus.findOne({ where: { plate: req.body.plate } })
    if (findPlate && !(findPlate.id == req.params.id)) {
        res.status(409).json({
            message: res.__("Bus with") + " " + req.body.plate + " " + res.__("already exist")
        })
        return false
    }
    next()
}

exports.checkRole = async (req, res, next) => {
   
    if (req.user.role != "driver") {
        res.status(401).json({
            message: res.__("user is not driver")
        })
        return false
    }
    next()
}

exports.checkAssigned = async (req, res, next) => {
    const findBus = await Bus.findOne({ where: { id: req.params.id } })
    if (findBus.userId != null) {
        res.status(409).json({
            message: `${res.__("Bus with")} ${findBus.plate} ${res.__("already assigned")}`
        })
        return false
    }
    next()
}

exports.checkRoute = async (req, res, next) => {
    const findRoute = await Route.findOne({ where: { routeID: req.body.routeID } })
    if (findRoute && !(findRoute.id == req.params.id)) {
        res.status(409).json({
            message: res.__("Route ") + " << " + req.body.routeID + " >> " + res.__("already exist")
        })
        return false
    }
    next()
}

exports.ckeckUserEmail=async(req,res,next)=>{
    const user = await User.findOne({ where: {email: req.body.email } })
    if (!user) {
        res.status(404).json({
            status: 404,
            message: res.__('Email is not found'),
        });
        return false
    }
    req.user=user
    next()
}

exports.checkDriverAssigned = async (req, res, next) => {
    const buses = await Bus.findAll({where: { userId: { [Op.ne]: null } }})
    const userIds = buses.map(bus => bus.userId)
    
    if (userIds.includes(req.user.id)) {
        res.status(409).json({
            message: res.__("Driver is already assigned")
        })
        return false
    }
    next()
}

exports.checkAssignment = async (req, res, next) => {
   const bus=await Bus.findOne({where:{userId:req.user.id}})
    if (!bus) {
        res.status(401).json({
            message: res.__("user is not assigned to bus")
        })
        return false
    }
    next()
}

exports.checkRouteExist = async (req,res,next) =>{
    const {origin,destination} = req.query
   // const routeName = `${origin} - ${destination}`
    const route = await Route.findOne({
        where:{                
            [Op.or]:[{origin,destination},{origin:destination,destination:origin}]
            }
    })

    if(!route){
        res.status(401).json({
            message: res.__("this router doesn't exist in system")
        })
        return false
    }
    req.route = route
    next();
}

exports.findRoute = async(req, res, next)=>{
    const findRoute = await Route.findOne({
        where:{ routeID: req.body.routeID }
    })
    if(!findRoute){
        res.status(404).json({
            message: res.__("route doesn't exist")
        });
        return false
    }
    req.route = findRoute
    next()   
}

exports.checkBusAssigned = async (req, res, next) => {
    const findBus = await Bus.findOne({ where: { id: req.params.id } })
    if (findBus.routeId != null) {
        res.status(409).json({
            message: `${res.__("Bus with")} ${findBus.plate} ${res.__("already assigned")}`
        })
        return false
    }
    next()
}
