import Joi from 'joi';
const resetPassword = (req, res, next) => {
    const schema= Joi.object({
        password: Joi.string()
                     .required()
                     .min(5)
                     .messages({ 
                        "any.required": res.__('password is required'),
                        "string.empty": res.__('password is not allowed to be empty'),
                        "string.min": res.__('Password should have a minimum length of 5 characters')
                        }),
        confirmPassword: Joi.string()
                            .required()
                            .valid(Joi.ref('password'))
                            .messages({ 
                                "any.required": res.__('confirm password is required'),
                                "string.empty": res.__('Confirm Password should be matching to password provided'),
                                "any.only": res.__('Confirm Password should be matching to password provided')
                                })
        
     });
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
next();
};
export default resetPassword
