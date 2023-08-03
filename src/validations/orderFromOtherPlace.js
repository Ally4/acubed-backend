import Joi from '@hapi/joi';

export const orderFromOtherPlace = Joi.object().keys({
  name: Joi.string().max(15).required(),
  sex: Joi.string().max(15).required(),
  age: Joi.string().required(),
  city: Joi.string().max(15).required(),
  district: Joi.string().max(15).required(),
  phoneNumber: Joi.string().min(5).max(15).required(),
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
