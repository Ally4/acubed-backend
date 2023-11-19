import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fs from 'fs';
import PDFDocument from 'pdfkit';


dotenv.config();

const { results, Users } = Models;
class SendResults {
  static async create(req, res) {
    try {
      const {
        name,
        email,
        phoneNumber,  
        address,
        sickness,
      } = req.body;
      const id = uuidv4();


      const user = await Users.findOne({
        where: { phoneNumber },
      });      

      const orderTest =  await results.create({
        name,
        email,
        phoneNumber,  
        address,
        sickness,
      });


            // Create PDF document
            const pdfPath = `result_${id}.pdf`;
            const pdfDoc = new PDFDocument();
            pdfDoc.pipe(fs.createWriteStream(pdfPath));
            pdfDoc.text(`Name: ${name}`);
            pdfDoc.text(`Sickness: ${sickness}`);
            // Add more information as needed
            pdfDoc.end();




      // const order = {
      //   from: process.env.EMAIL_FROM,
      //   to: user.email,
      //   // to: process.env.EMAIL_TO,
      //   // from: user.email,
      //   subject: 'Thank you for ordering your test with us',
      //   html: `<h2> You have received your results</h2>`,
      // };
      // mail.send(order);

      const displayOrderFromHospital = {
        name,
        sickness,
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('The result send successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default SendResults;
