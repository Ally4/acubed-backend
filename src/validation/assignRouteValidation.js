import Joi from 'joi';

exports.routeIDValidate = (req, res, next) => {
    const routeIDValidation = Joi.object({
        routeID: Joi.number().integer().min(100).required().messages({
            "any.required": res.__('routeID should be required'),
            "number.base": res.__('routeID should be a number'),
            "number.integer": res.__('routeID should be integer number'),
            "number.min": res.__('routeID should be greater than 100')
        })
    })
    const result = routeIDValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
