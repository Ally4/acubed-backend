import Joi from '@hapi/joi';

export const reset = Joi.object().keys({
  email: Joi.string().email().max(50).required(),
  newpassword: Joi.string().min(5).max(50).required(),
  confirmation: Joi.string().min(5).max(50).required(),
});

export const validationErrorResetPassword = (req, res, next) => {
  const { error } = reset.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
