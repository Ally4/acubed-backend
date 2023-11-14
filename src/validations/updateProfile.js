import Joi from '@hapi/joi';

export const signup = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  city: Joi.string(),
  occupation: Joi.string(),
  email: Joi.string().email(),
  dateOfBirth: Joi.string(),
  gender: Joi.string(),
  address: Joi.string(),
  phoneNumber: Joi.string(),
  profilPicture: Joi.string(),
  images: Joi.string(),
  role: Joi.string(),
});

export const validationUpdateProfil = (req, res, next) => {
  const { error } = signup.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
