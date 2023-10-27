import Joi from '@hapi/joi';

export const bookAppointments = Joi.object().keys({
  firstName: Joi.string().max(15),
  lastName: Joi.string().max(15),
  phoneNumber: Joi.string().max(15),
  email: Joi.string().max(15),
  sex: Joi.string().max(15),
  age: Joi.string().max(15),
  address: Joi.string().max(15),
  HealthFacility: Joi.string().max(15),
  department: Joi.string().max(15),
  particularDoctor: Joi.string().max(15),
  rendezVous: Joi.string().max(15),
});

export const validationErrorBookAppointments = (req, res, next) => {
  const { error } = bookAppointments.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
