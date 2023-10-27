import Joi from '@hapi/joi';

export const orderFromOtherPlace = Joi.object().keys({
  name: Joi.string(),
  sex: Joi.string(),
  age: Joi.string(),
  city: Joi.string(),
  district: Joi.string(),
  phoneNumber: Joi.string(),
});

export const validationErrorOtherPlace = (req, res, next) => {
  const { error } = orderFromOtherPlace.validate(req.body);
 console.log(`this is error ${JSON.stringify(req.body)}`);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
