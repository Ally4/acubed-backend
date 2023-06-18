import Joi from 'joi';
exports.userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string().min(4).messages({
            "string.empty": res.__('Name must not be empty'),
            "string.min": res.__('Name must be atleast four characters')
        }),

        email: Joi.string().email().messages({
            "string.email": res.__("provide valid email"),
            "string.empty": res.__('Email must not be empty')
        }),

        gender: Joi.string().valid('male', 'female', 'I rather not say').messages({
            "any.only": res.__("gender must be one of [male, female, I rather not say]")
        }),
        
        birthdate: Joi.date().messages({
            "date.base": res.__('date of birth should be in a format yyyy-mm-dd')
        })
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
