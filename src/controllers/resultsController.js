import { v4 as uuidv4 } from 'uuid';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import Models from '../database/models';

import cloudinary from '../cloudinary/cloudinary';

dotenv.config();

const { results, Users } = Models;

// Function to upload file to Cloudinary and return a Promise
const uploadPdfToCloudinary = (fileBuffer) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    { resource_type: 'raw', folder:'acubed-results-pdf' },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  ).end(fileBuffer);
});


// const uploadImage = async (file) => {
//   try {
//     const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-results-pictures'});
//     return result;
//   } catch (error) {
//     // console.error('error uploading image to cloudinary', error);
//     throw error;
//   }
// }

class SendResults {
  static async create(req, res) {
    try {
      const {
        patientId,
        name,
        email,
        phoneNumber,
        address,
        sickness,
      } = req.body;

      const id = uuidv4();

      if (!req.file || !req.file.buffer) {
        return res.status(400).json({
          status: 400,
          message: "PDF file is required.",
        });
      }

      const result = await uploadPdfToCloudinary(req.file.buffer);

      const record = await results.create({
        id,
        patientId,
        name,
        email,
        phoneNumber,
        address,
        sickness,
        pdf: result.secure_url,
      });

      return res.status(201).json({
        status: 201,
        message: res.__('The result was sent successfully'),
        data: record,
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }

  static async getAllResults(req, res) {
    try {
      const allResults = await results.findAll();
      if (!allResults) {
        return res.status(404).send('no results found');
      }
      return res.status(200).json({
        status: 200,
        message: 'Results fetched successfully',
        data: allResults,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }

  static async getResultByPatientEmail(req, res) {
    try {
      const { email } = req.params;
      const result = await results.findAll({
        where: { email }
      });
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'no result found on that name',
      })
    }
      return res.status(200).json({
        status: 200,
        message: 'Result fetched successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }


  // future implementation, after considering different requirement

  static async updateSomeResultByPatientEmail(req, res) {
    try {

      const { name } = req.params;
      const result = await results.update(req.body, {
        where: { name },
      });

      // the loggedin users
      // const { user } = req.user;
      // const updatedField = await Users.update(req.body, {
      //   where: { user },
      //   returning: true,
      //   plain: true,
      // });
      const userData = updatedField[1];

      // const { name } = req.params;
      // const result = await results.update({
      //   where: { name },
      //   attributes: {
      //     exclude: ['pdf'],
      //   },
      // });

      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }

  static async updateResultByPatientEmail(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }

  static async deleteResultByPatientEmail(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }
}

export default SendResults;