import Joi from '@hapi/joi';

export const bookAppointments = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  sex: Joi.string(),
  age: Joi.string(),
  address: Joi.string(),
  healthFacility: Joi.string(),
  department: Joi.string(),
  particularDoctor: Joi.string(),
  rendezVous: Joi.string(),
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
