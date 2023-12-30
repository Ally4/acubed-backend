import Joi from '@hapi/joi';

const resultsSchema = Joi.object({
  patientId: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  sickness: Joi.string(),
  pdfFile: Joi.string(),
});

export const validateResults = (req, res, next) => {
  const { error } = resultsSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message.replace(/"/g, '');
    return res.status(400).json({
      status: 400,
      message: errorMessage,
    });
  }

  next();
};
