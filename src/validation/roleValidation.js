import Joi from '@hapi/joi';
const roleValidate = (req, res, next) => {
    const roleValidation = Joi.object({
        email: Joi.string().required().email().messages({
            "any.required": res.__('email is required'),
            "string.email": res.__('email is not valid'),
            "string.empty": res.__('email should not be empty')
        }),
        role: Joi.string().required().valid('normal', 'driver', 'operator', 'admin').messages({
            "any.required": res.__('role is required'),
            "any.only": res.__("role must be one of [normal, driver, operator, admin]")
        })
    });
    const result = roleValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
export default roleValidate
