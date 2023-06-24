import Joi from '@hapi/joi';

const busInfo = (req) => {
  const schema = Joi.object().keys({
    busPlate: Joi.string().min(7).required().exist(),
    busStatus: Joi.string().valid('active', 'inactive').default('inactive'),
    busLocation: Joi.string().valid(),
    busCompany: Joi.string().valid(),
    busSeats: Joi.number().valid().not(0).positive(),
  });
  return schema.validate(req.body);
};

const busUpdate = (req) => {
  const schema = Joi.object().keys({
    busPlate: Joi.string().min(7).required(),
    busStatus: Joi.string().valid('active', 'inactive').default('inactive'),
    busLocation: Joi.string().valid(),
    busCompany: Joi.string().valid(),
    busSeats: Joi.number().valid().not(0).positive(),
  });

  return schema.validate(req.body);
};

const viewBusValidation = (req, res, next) => {
  const schema = Joi.object({
    origin: Joi.string().required().min(4).messages({
      'string.min': res.__('origin should be not less than 4 characters'),
      'any.required': res.__('origin is required'),
    }),
    destination: Joi.string().required().min(4).messages({
      'string.min': res.__('destination should be not less than 4 characters'),
      'any.required': res.__('destination is required'),
    }),
  });

  const results = schema.validate(req.query);
  if (results.error) return res.status(400).json({ status: '400', message: results.error.details[0].message });
  next();
};

export { busInfo, busUpdate, viewBusValidation };
