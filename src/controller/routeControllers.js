import Model from '../database/models'
import { paginate } from 'paginate-info'

const {Route} = Model
class routeController {
    static async createNewRoute(req, res) {
        try {
            const { routeID, origin, destination, price } = req.body
            const name = `${req.body.origin} - ${req.body.destination}`

            const route = await Route.create({
                routeID, name, origin, destination, price
            });
            return res.status(201).json({
                route
            });
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't add new route")
            })
        }
    }

    static async getAllRoute(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            const { rows, count } = await Route.findAndCountAll({
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
                message: res.__("can't get routes")
            })
        }
    }

    static async getRoute(req, res) {
        try {
            const route = await Route.findOne({ where: { id: req.params.id } })
            return res.status(200).json({ route })
        } catch (error) {
            return res.status(500).json({
                message: res.__("Route with") + ` id = ${req.params.id} ` + res.__("not found")
            })
        }
    }

    static async updateRoute(req, res) {
        try {
            const { routeID, origin, destination, price } = req.body
            const name = `${req.body.origin} - ${req.body.destination}`

            const updated = await Route.update(
                { routeID, name, origin, destination, price },
                { where: { id: req.params.id } })

            if (updated) {
                const updatedRoute = await Route.findByPk(req.params.id)
                return res.status(200).json({
                    updatedRoute
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't update route with id = ") + req.params.id
            })
        }
    }

    static async deleteRoute(req, res) {
        try {
            await Route.destroy({ where: { id: req.params.id } })
            return res.status(200).json({
                message: res.__("Deleted successfully")
            })
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't delete route with id = ") + req.params.id
            })
        }
    }

}

export default routeController
