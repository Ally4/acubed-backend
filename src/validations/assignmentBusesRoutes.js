import Joi from '@hapi/joi';

export const assignBusesRoutes = Joi.object().keys({
  routeID: Joi.number().integer().required(),
});

export const validationBusesRoutes = (req, res, next) => {
  const { error } = assignBusesRoutes.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
