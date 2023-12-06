
import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import cloudinary from '../cloudinary/cloudinary'
const fs = require('fs');



const { healthFacilities } = Models;


const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-facility-images'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}

class healthInstitution {
  static async create(req, res) {
    try {
      const {
        name,
        email,
        phoneNumber,  
        address,
        category
      } = req.body;
      const id = uuidv4();
      const inSystem = await healthFacilities.findOne({
        where: { name },
      });

      
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The facility is already in the system') });
      }


      // const result = await uploadImage(req.file);

      // await Users.update(
      //   {profilPicture: result.secure_url},
      //   {where: { name }},
      // );

      // await healthFacilities.create(
      //   {profilPicture: result.secure_url},
      //   // {where: { name }},
      // );

      // console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', result.secure_url)


      const healthFacility = await healthFacilities.create({
        name,
        email,
        phoneNumber,  
        address,
        category,

        // profilPicture: result.secure_url
      });


      const healthFacilityDisplay = {
        name: healthFacility.name,
        email: healthFacility.email,
        phoneNumber: healthFacility.phoneNumber,  
        address: healthFacility.address,
        category: healthFacility.category,
        profilPicture: healthFacility.profilPicture,
        // profilPicture: result.secure_url
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Health facility created successfully'),
        data: healthFacilityDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        ab: console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', error),
        status: 500,
        message: error.message,
      });
    }
  }


  static async addTests(req, res) {
    try {
      const { name } = req.params;
      const healthFacility = await healthFacilities.findOne({
        where: { name },
      });
  
      if (!healthFacility) {
        return res.status(404).json({
          status: 404,
          message: res.__('There is no such facility in the system'),
        });
      }
  
      const { tests } = req.body;
  
      // Ensure tests is an array
      if (!Array.isArray(tests)) {
        return res.status(400).json({
          status: 400,
          message: res.__('Invalid value for tests. It should be an array.'),
        });
      }
  
      // Concatenate the new tests with the existing ones
      const updatedTests = [...healthFacility.tests, ...tests];
  
      // Update the healthFacility with the new tests
      const updatedHealthFacility = await healthFacility.update({ tests: updatedTests });
  
      const healthFacilityDisplay = {
        name: updatedHealthFacility.name,
        tests: updatedHealthFacility.tests,
      };
  
      return res.status(200).json({
        status: 200,
        message: res.__('Tests added successfully'),
        data: healthFacilityDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  
  static async getAllHealthFacilities(req, res) {
    try {
      const healthFacilitiesList = await healthFacilities.findAll();

      if (!healthFacilitiesList) {
        return res.status(400).json({
          status: 400,
          message: res.__('No health facility found'),
          data: formattedHealthFacilities,
        });
      }
  
      const formattedHealthFacilities = healthFacilitiesList.map((facility) => {
        return {
          name: facility.name,
          email: facility.email,
          phoneNumber: facility.phoneNumber,
          address: facility.address,
          category: facility.category,
          profilPicture: facility.profilPicture
        };
      });
  
      return res.status(200).json({
        status: 200,
        message: res.__('Health facilities retrieved successfully'),
        data: formattedHealthFacilities,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  

  static async getAllTestsOfFacility(req, res) {
    try {
      const { name } = req.params;
      const healthFacility = await healthFacilities.findOne({
        where: { name },
      });
  
      if (!healthFacility) {
        return res.status(404).json({
          status: 404,
          message: res.__('There is no such facility in the system'),
        });
      }
  
      const tests = healthFacility.tests || [];
  
      const healthFacilityDisplay = {
        name: healthFacility.name,
        tests: tests,
      };
  
      return res.status(200).json({
        status: 200,
        message: res.__('Tests retrieved successfully'),
        data: healthFacilityDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  
}

export default healthInstitution;
