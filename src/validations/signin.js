import Joi from '@hapi/joi';
export const signin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const validateSignin = (req, res, next) => {
  const { error } = signin.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};