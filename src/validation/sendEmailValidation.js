import Joi from 'joi';
const sendEmailChecker = (req, res, next) => {
    const schema= Joi.object({
        email: Joi.string()
                  .required()
                  .email()
                  .messages({ 
                    "string.email": res.__("provide valid email"),
                    "any.required": res.__('email is required'),
                    "string.empty": res.__('Email must not be empty')
                    })
    });
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
};
export default sendEmailChecker
