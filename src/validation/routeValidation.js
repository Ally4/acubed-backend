import Joi from 'joi';

exports.routeValidate = (req, res, next) => {
    const routeValidation = Joi.object({
        //routeID, origin, destination, price
        routeID: Joi.number().integer().min(100).required().messages({
            "any.required": res.__('routeID should be required'),
            "number.base": res.__('routeID should be a number'),
            "number.integer": res.__('routeID should be integer number'),
            "number.min": res.__('routeID should be greater than 100')
        }),

        origin: Joi.string().required().trim().messages({
            "any.required": res.__('origin should be required'),
            "string.empty": res.__('origin should not be empty')
        }),

        destination: Joi.string().required().trim().messages({
            "any.required": res.__('destination should be required'),
            "string.empty": res.__('destination should not be empty')
        }),

        price: Joi.number().integer().min(100).required().messages({
            "any.required": res.__('price should be required'),
            "number.base": res.__('price should be a number'),
            "number.integer": res.__('price should be integer number'),
            "number.min": res.__('price should be greater than or equal to 100')
        }),

    });
    const result = routeValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

