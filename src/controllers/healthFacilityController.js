
import { v4 as uuidv4 } from 'uuid';
import Models from '../database/models';



const { Users } = Models;
class healthInstitution {
  static async create(req, res) {
    try {
      const {
        name,
        email,
        phoneNumber,  
        address,
        category,
        tests
      } = req.body;
      const id = uuidv4();
      const inSystem = await Users.findOne({
        where: { name },
      });

      
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The email is already in the system') });
      }

      const healthFacility = await Users.create({
        name,
        email,
        phoneNumber,  
        address,
        category,
        tests
      });
      const healthFacilityDisplay = {
        name,
        email,
        phoneNumber,  
        address,
        category
      };
      
      return res.status(201).json({
        status: 201,
        message: res.__('Health facility created successfully'),
        data: healthFacilityDisplay,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default healthInstitution;
