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

      // Create PDF document
      const pdfPath = `result_${id}.pdf`;
      const pdfDoc = new PDFDocument();
      const pdfStream = fs.createWriteStream(pdfPath);

      // Wrap the stream in a Promise
      const streamPromise = new Promise((resolve, reject) => {
        pdfStream.on('finish', resolve);
        pdfStream.on('error', reject);
      });

      pdfDoc.pipe(pdfStream);

      pdfDoc.image('/home/ally/Desktop/workv/backend/acubed-backend/src/images/acubed-l.jpg', 50, 50, { width: 100 });
      pdfDoc.image('/home/ally/Desktop/workv/backend/acubed-backend/src/images/acubed-l.jpg', 400, 50, { width: 100 });

      // End PDF creation
      pdfDoc.end();

      // Wait for the stream to finish writing before proceeding
      await streamPromise;

      // Read the PDF into a buffer
      const pdfBuffer = fs.readFileSync(pdfPath);

      // Save the PDF content in the database
      await results.create({
        name,
        email,
        phoneNumber,
        address,
        sickness,
        pdf: pdfBuffer,
      });

      // Delete the generated PDF file
      fs.unlinkSync(pdfPath);

      const displayOrderFromHospital = {
        name,
        sickness,
      };

      return res.status(201).json({
        status: 201,
        message: res.__('The result was sent successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default SendResults;
