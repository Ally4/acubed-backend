import Joi from '@hapi/joi';
export const results = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),  
  address: Joi.string(),
  sickness: Joi.string(),
});
export const validateResults = (req, res, next) => {
  const { error } = results.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};