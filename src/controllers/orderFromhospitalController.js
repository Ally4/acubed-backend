
import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';



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
        phoneNumber
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
        phoneNumber
      });

      const order = {
        to: process.env.EMAIL_TO,
        from: user.email,
        subject: 'Thank you for ordering your test with us',
        html: `<h2> Dear customer to proceed you can pay to this number 0784403223 </h2>`,
      };
      mail.send(order);

      const displayOrderFromHospital = {
        name,
        hospitalName,
        department,
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Test ordered successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      console.log('this is the relation error', error)
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default testOrderFromHospital;
