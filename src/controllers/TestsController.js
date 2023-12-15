
import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';
import cloudinary from '../cloudinary/cloudinary'



const { tests } = Models;

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-facility-images'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}


class Test {
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
      const inSystem = await tests.findOne({
        where: { name },
      });

      
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The facility is already in the system') });
      }


      const result = await uploadImage(req.file);

      await tests.update(
        {profilPicture: result.secure_url},
        {where: { name }},
      );


      const test = await tests.create({
        name,
        email,
        phoneNumber,  
        address,
        category,
      });


      const testDisplay = {
        name: test.name,
        email: test.email,
        phoneNumber: test.phoneNumber,  
        address: test.address,
        category: test.category,
        profilPicture: result.secure_url
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Health facility created successfully'),
        data: testDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }


  static async addFacilities(req, res) {
    try {
      const { name } = req.params;
      const test = await tests.findOne({
        where: { name },
      });
  
      if (!test) {
        return res.status(404).json({
          status: 404,
          message: res.__('There is no such facility in the system'),
        });
      }
  
      const { facilities } = req.body;
  
      // Ensure tests is an array
      if (!Array.isArray(facilities)) {
        return res.status(400).json({
          status: 400,
          message: res.__('Invalid value for tests. It should be an array.'),
        });
      }
  
      // Concatenate the new tests with the existing ones
      const updatedFacilities = [...tests.facilities, ...facilities];
  
      // Update the healthFacility with the new tests
      const updatedTest = await tests.update({ facilities: updatedFacilities });
  
      const healthFacilityDisplay = {
        name: updatedTest.name,
        tests: updatedTest.facilities,
      };
  
      return res.status(200).json({
        status: 200,
        message: res.__('Facilities added successfully'),
        data: healthFacilityDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }
  
  static async getAllTests(req, res) {
    try {
      const testsList = await tests.findAll();

      if (!testsList) {
        return res.status(400).json({
          status: 400,
          message: res.__('No tests facility found'),
          data: formattedTests,
        });
      }
  
      const formattedTests = testsList.map((test) => {
        return {
          name: test.name,
          email: test.email,
          phoneNumber: test.phoneNumber,
          address: test.address,
          category: test.category,
        };
      });
  
      return res.status(200).json({
        status: 200,
        message: res.__('Tests retrieved successfully'),
        data: formattedTests,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }
  

  static async getAllFacilitiesOfTest(req, res) {
    try {
      const { name } = req.params;
      const formattedTests = await tests.findOne({
        where: { name },
      });
  
      if (!formattedTests) {
        return res.status(404).json({
          status: 404,
          message: res.__('There is no such facility in the system'),
        });
      }
  
      const tests = formattedTests.facilities || [];
  
      const formattedTestsDisplay = {
        name: formattedTests.name,
        facilities: facilities,
      };
  
      return res.status(200).json({
        status: 200,
        message: res.__('Facilities retrieved successfully'),
        data: formattedTestsDisplay,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error.message,
      });
    }
  }
  
}

export default Test;
