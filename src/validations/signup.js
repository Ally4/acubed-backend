import Joi from '@hapi/joi';

export const signup = Joi.object().keys({
  firstName: Joi.string().min(5).max(15).required(),
  lastName: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.string().min(5).max(15),
  password: Joi.string().min(5).max(15).required(),
  confirmPassword: Joi.string().min(5).max(15).required(),
  gender: Joi.string().min(3).max(15),
  address: Joi.string().min(5).max(15),
  phoneNumber: Joi.string().min(5).max(15).required(),
  role: Joi.string().min(3).max(15),
});

export const validationError = (req, res, next) => {
  const { error } = signup.validate(req.body);
 console.log(`this is error ${JSON.stringify(req.body)}`);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
