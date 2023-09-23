import Joi from '@hapi/joi';

export const signup = Joi.object().keys({
  user: Joi.string().min(1).max(200).trim().required(),
  // firstName: Joi.string().min(5).max(15).trim().required(),
  // lastName: Joi.string().min(5).max(15).trim().required(),
  // email: Joi.string().email().trim().required(),
  // dateOfBirth: Joi.string().trim().min(5).max(15),
  password: Joi.string().min(1).max(30).trim().required(),
  confirmPassword: Joi.string().min(1).max(30).trim().required(),
  // gender: Joi.string().min(3).max(15).trim(),
  // address: Joi.string().min(5).max(15).trim(),
  // phoneNumber: Joi.string().min(5).max(15).trim().required(),
  // profilPicture: Joi.string().min(5).max(200).trim(),
  // role: Joi.string().min(3).max(15).trim(),
});

export const validationSignup = (req, res, next) => {
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
