import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';


dotenv.config();

const { bookAppointments } = Models;
class bookAppointment {
  static async create(req, res) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        sex,
        age,
        address,
        HealthFacility,
        department,
        particularDoctor,
        rendezVous,
      } = req.body;
      const id = uuidv4();

      const bookAnAppointment =  await bookAppointments.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        sex,
        age,
        address,
        HealthFacility,
        department,
        particularDoctor,
        rendezVous,
      });

      const order = {
        from: process.env.EMAIL_FROM,
        to: email,
        // to: process.env.EMAIL_TO,
        // from: user.email,
        subject: 'Thank you for booking an appointment with us',
        html: `<h2> Dear customer for any problem or clarification you can give us a call on this number 0941841870 </h2>`,
      };
      mail.send(order);

      const booking = {
        firstName,
        phoneNumber,
        HealthFacility,
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Your rendez-vous has been successfully booked'),
        data: booking,
      });
    } catch (error) {
      console.log('this is the relation error', error)
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default bookAppointment;
