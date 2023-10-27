import Joi from '@hapi/joi';

export const orderFromHospital = Joi.object().keys({
  nameOfTest: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  sex: Joi.string(),
  age: Joi.string(),
  accessPoint: Joi.string(),
  phoneNumber: Joi.string(),
  payment: Joi.string(),
});

export const validationErrorOrderHospital = (req, res, next) => {
  const { error } = orderFromHospital.validate(req.body);
 console.log(`this is error ${JSON.stringify(req.body)}`);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
