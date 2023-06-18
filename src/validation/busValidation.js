import Joi from 'joi';

exports.busValidate = (req, res, next) => {
    const busValidation = Joi.object({

        plate: Joi.string().min(7).required().messages({
            "any.required": res.__('plate should be required'),
            "string.min": res.__('plate should be at least 7 character'),
            "string.empty": res.__('plate should not be empty')
        }),

        company: Joi.string().required().messages({
            "any.required": res.__('company should be required'),
            "string.empty": res.__('company should not be empty')
        }),

        type: Joi.string().required().messages({
            "any.required": res.__('type should be required'),
            "string.empty": res.__('type should not be empty')
        }),

        location: Joi.string().required().messages({
            "any.required": res.__('location should be required'),
            "string.empty": res.__('location should not be empty')
        }),

        seats: Joi.number().integer().min(18).required().messages({
            "any.required": res.__('seats should be required'),
            "number.base": res.__('seats should be a number'),
            "number.integer": res.__('seats should be integer number'),
            "number.min": res.__('seats should be greater than or equal to 18')
        }),

        status: Joi.string().valid('moving', 'at rest', 'stuck in traffic').required().messages({
            "any.required": res.__('status should be required'),
            "any.only": res.__("status should be ['moving', 'at rest', 'stuck in traffic']")
        })

    });
    const result = busValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

exports.viewBusValidation = (req,res,next) =>{
    const schema = Joi.object({
        origin: Joi.string().required().min(4).messages({
            "string.min":res.__("origin should be not less than 4 characters"),
            "any.required": res.__('origin is required'),
            "string.empty": res.__('origin must not be empty')
        }),
        destination: Joi.string().required().min(4).messages({
            "string.min":res.__("destination should be not less than 4 characters"),
            "any.required": res.__('destination is required'),
            "string.empty": res.__('destination must not be empty')
        })
    })
    const results = schema.validate(req.query);
    if (results.error) return res.status(400).json({ message: results.error.details[0].message });
    next();
}
