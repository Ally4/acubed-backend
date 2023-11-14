import Joi from '@hapi/joi';

export const orderFromHospital = Joi.object().keys({
  name:Joi.string(),
  sex:Joi.string(),
  age:Joi.string(),
  hospitalName:Joi.string(),
  department:Joi.string(),
  roomNumber:Joi.string(),
  phoneNumber:Joi.string(),
});

export const validationErrorOrderHospital = (req, res, next) => {
  const { error } = orderFromHospital.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
