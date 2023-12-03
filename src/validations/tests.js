import Joi from '@hapi/joi';
export const tests = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
  approximateWait: Joi.string().required(),  
  // address: Joi.string().required(),
  // category: Joi.string().required(),
  // profilPicture: Joi.string(),
  // images: Joi.string(),
  // facilities: Joi
  // .array()
  // .items(
  //   Joi.object({
  //     name: Joi.string(),
  //     price: Joi.string(),
  //     approximateWait: Joi.string(),
  //   })
  // )
  // .required(),
});
export const validateTests = (req, res, next) => {
  const { error } = tests.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};