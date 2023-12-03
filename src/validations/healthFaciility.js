import Joi from '@hapi/joi';
export const signin = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),  
    address: Joi.string().required(),
    category: Joi.string().required(),
    profilPicture: Joi.string(),
    images: Joi.string(),
  // tests: Joi
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
export const validateHealthFacility = (req, res, next) => {
  const { error } = signin.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};