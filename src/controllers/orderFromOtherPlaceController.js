
import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import mail from '@sendgrid/mail';



const { orderFromOtherPlace } = Models;
const {  Users } = Models;
class testOrderFromOtherPlace {
  static async create(req, res) {
    try {
      const {
        name,
        sex,
        age,  
        city,
        district,
        phoneNumber
      } = req.body;
      const id = uuidv4();

      const user = await Users.findOne({
        where: { phoneNumber },
      }); 
      
    const orderTest =  await orderFromOtherPlace.create({
        id,
        name,
        sex,
        age,  
        city,
        district,
        phoneNumber
      });

      const order = {
        to: user.email,
        from: 'el.ally741@gmail.com',
        subject: 'Thank you for ordering your test with us',
        html: `<h2> Dear customer to proceed you can pay to this number 0784403223 </h2>`,
      };
      mail.send(order);

      const displayOrderFromOther = {
        name,
        city,
        district,
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Test ordered successfully'),
        data: displayOrderFromOther,
      });
    } catch (error) {
      console.log('this is the relation error', error)
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default testOrderFromOtherPlace;
