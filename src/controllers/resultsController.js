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

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-results-pictures'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}

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

      // Upload the file to Cloudinary
      const result = await uploadPdfToCloudinary(req.file.buffer);

      // // for cloudinary image upload 
      // const resultImage = await uploadImage(req.file);

      // Use your database model (e.g., results.create) to save the data
      await results.create({
        id,
        name,
        email,
        phoneNumber,
        address,
        sickness,
        pdf: result.secure_url,
        // resultPicture: resultImage.secure_url
      });

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

  static async getResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name }
      });
      if (!result) {
        return res.status(404).send('no result on that name');
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

  static async updateSomeResultByPatientId(req, res) {
    try {
      /// ///////////////////////////////////////////////////////////////// due to the changes of Asnake on the uploading of the results by the doctors, we are going to see how to upload images and pdf files in node.js, which has also to be a case for the creation of report, and it better to have to upload an image and/or a pdf, after this I will proceed with implementing the log in and signup in the fronten

      // Update

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

  static async updateResultByPatientId(req, res) {
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

  static async deleteResultByPatientId(req, res) {
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