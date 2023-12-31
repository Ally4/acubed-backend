import Joi from '@hapi/joi';

export const forgot = Joi.object().keys({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

export const validationErrorVerifyCode = (req, res, next) => {
  const { error } = forgot.validate(req.body);
  if (error) {
    res.status(401).json({
      status: 401,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
