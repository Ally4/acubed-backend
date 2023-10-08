import Joi from '@hapi/joi';

export const signup = Joi.object().keys({
  firstName: Joi.string().min(1).max(15),
  lastName: Joi.string().min(1).max(15),
  email: Joi.string().email(),
  dateOfBirth: Joi.string().min(1).max(15),
  gender: Joi.string().min(1).max(15),
  address: Joi.string().min(1).max(15),
  phoneNumber: Joi.string().min(1).max(15),
  profilPicture: Joi.string().min(1).max(500),
  images: Joi.string().min(1).max(500),
  image: Joi.string().min(1).max(500),
  role: Joi.string().min(1).max(15),
});

export const validationUpdateProfil = (req, res, next) => {
  const { error } = signup.validate(req.body);
 console.log(`this is error ${JSON.stringify(req.body)}`);
 console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", error)
  if (error) {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuggggggggggggggggggggggggggggggg", error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
