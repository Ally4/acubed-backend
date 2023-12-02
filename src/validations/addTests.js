import Joi from '@hapi/joi';
export const addTests = Joi.object().keys({
  tests: Joi
  .array()
  .items(
    Joi.object({
      name: Joi.string(),
      price: Joi.string(),
      approximateWait: Joi.string(),
    })
  )
  .required(),
});
export const validateAddTests = (req, res, next) => {
  const { error } = addTests.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};