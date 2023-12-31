import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';


dotenv.config();

const { orderFromHospitals, Users } = Models;
class testOrderFromHospital {
  static async create(req, res) {
    try {
      const {
        name,
        sex,
        age,
        hospitalName,
        department,
        roomNumber,
        phoneNumber,
      } = req.body;
      const id = uuidv4();


      const user = await Users.findOne({
        where: { phoneNumber },
      });      

      const orderTest =  await orderFromHospitals.create({
        name,
        sex,
        age,
        hospitalName,
        department,
        roomNumber,
        phoneNumber,
      });

      const order = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        // to: process.env.EMAIL_TO,
        // from: user.email,
        subject: 'Thank you for ordering your test with us',
        html: `<h2> Dear customer to proceed you can pay to this number 0941841870 </h2>`,
      };
      mail.send(order);

      const displayOrderFromHospital = {
        name,
        hospitalName,
        phoneNumber,
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Test ordered successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default testOrderFromHospital;
