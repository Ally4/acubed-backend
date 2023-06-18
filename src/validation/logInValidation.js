import Joi from 'joi';
const logInChecker = (req, res, next) => {
    const schema= Joi.object({
                        email: Joi.string()
                                   .required()
                                   .email()                     
                                   .messages({ 
                                        "string.email": res.__("provide valid email"),
                                        "any.required": res.__('email is required'),
                                        "string.empty": res.__('Email must not be empty')
                                    }),
                        password: Joi.string()
                                     .required()
                                     .min(5)
                                     .messages({ 
                                          "any.required": res.__('password is required'),
                                          "string.empty": res.__('password is not allowed to be empty'),
                                          "string.min": res.__('Password should have a minimum length of 5 characters')
                                        })
    });
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
};
export default logInChecker
