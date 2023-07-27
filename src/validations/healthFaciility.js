import Joi from '@hapi/joi';
export const signin = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),  
  address: Joi.string().required(),
  category: Joi.string().required(),
  tests: Joi
  .array()
  .items(
    joi.object({
      name: joi.string(),
      price: joi.string(),
      approximateWait: joi.string(),
    })
  )
  .required(),
});
export const validateSignin = (req, res, next) => {
  const { error } = signin.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};