import Joi from 'joi';
const userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string().required().min(4).messages({
            "any.required": res.__('name is required'),
            "string.empty": res.__('Name must not be empty'),
            "string.min": res.__('Name must be atleast four characters')
        }),

        email: Joi.string().required().email().messages({
            "string.email": res.__("provide valid email"),
            "any.required": res.__('email is required'),
            "string.empty": res.__('Email must not be empty')
        }),
        gender: Joi.string().max(8).required().messages({
            "string.max": res.__("gender should be not more 8 characters"),
            "any.required": res.__('gender is required'),
            "string.empty": res.__('gender must not be empty characters')
        }),
        birthdate: Joi.date().required().messages({
            "any.required": res.__('birthdate is required'),
            "date.base": res.__('date of birth should be in a format yyyy-mm-dd')
        }),
        password: Joi.string().required().min(4).messages({
            "any.required": res.__('name is required'),
            "string.empty": res.__('Name must not be empty'),
            "string.min": res.__('Name must be atleast four characters')
        }),
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
export default userValidate
