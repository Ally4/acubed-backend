import Joi from '@hapi/joi';
export const signin = Joi.object().keys({
  user: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
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