import Joi from '@hapi/joi';

export const orderFromHospital = Joi.object().keys({
  nameOfTest: Joi.string().max(15),
  firstName: Joi.string().max(15),
  lastName: Joi.string(),
  sex: Joi.string().max(150),
  age: Joi.string().max(150),
  accessPoint: Joi.string().max(150),
  phoneNumber: Joi.string().min(1).max(150),
  payment: Joi.string().min(1).max(150),
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
