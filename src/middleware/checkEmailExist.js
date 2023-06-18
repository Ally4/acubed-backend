import Model from '../database/models'

const checkIfEmailExists = async(req, res, next) => {
    const userExist = await Model.User.findOne({ where: { email: req.body.email } });

    if (!userExist) {
        return res.status(404).json({
            message: res.__("user doesn't exist") 
        })
    }
    next()
}
export default checkIfEmailExists
