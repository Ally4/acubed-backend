import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import bcrypts from 'bcrypt';
import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';
import Models from '../database/models';
import { password } from '../utils/password';
import { message } from '../utils/mails';
import { encode } from '../utils/jwt';

const { Op } = require('sequelize');

dotenv.config();
mail.setApiKey(process.env.SENDGRID);
const { Users } = Models;
class register {
  static async signup(req, res) {
    try {
      const {
        email,
        firstName,
        lastName,
        phoneNumber,  
        dateOfBirth,
        gender,
        address,
        password,
        confirmPassword,
      } = req.body;
      const id = uuidv4();
      const inSystem = await Users.findOne({
        where: { email },
      });
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('Check well the passwords you are inserting') });
      }
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The email is already in the system') });
      }
      
      const thePassword = bcrypts.hashSync(password, 10);

      const newUser = await Users.create({
        id,
        email,
        firstName,
        lastName,
        phoneNumber,  
        dateOfBirth,
        gender,
        address,
        password: thePassword,
        // role,
      });
      const newUserDisplay = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        // dateOfBirth: newUser.dateOfBirth,
        gender: newUser.gender,
        // address: newUser.address,
        // role: newUser.role
      };
      message(email);
      return res.status(201).json({
        status: 201,
        message: res.__('user created successfully'),
        data: newUserDisplay,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'Wrong email, please enter the registered email.',
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          status: 400,
          message: res.__('Wrong password, Please enter the registered password.'),
        });
      }
      const payload = { email, role: user.role };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { email } });

      const LoggedInUser = await Users.findOne({
        where: { email }
      });
      const data = {
        message: res.__('logged In successfull'),
        token: accessToken,
        userLoggedIn: LoggedInUser.isLoggedIn
      }
      return res.status(200).json(data);
    } catch (error) {

      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

static async logout(req,res){
  try {
    const isUpdated =  await Users.update(
        { isLoggedIn: false },
        { where: { email: req.user.email },returning: true,attributes: {
          exclude: ['password'],
        }, }
      );
      
        return res.status(200).json({
          message: res.__("Logout successfully"),
         isLoggedIn:isUpdated[1][0].isLoggedIn
        });
       
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    } }
  // updating driver or operator profile
  static async updateProfile(req, res) {
    try {
      const { email } = req.user;
      const updatedField = await Users.update(req.body, {
        where: { email },
        returning: true,
        plain: true,
      });
      const userData = updatedField[1];
      return res.status(200).json({
        status: 200,
        message: 'user updated',
        data: {
          firstname: userData.firstName,
          lastname: userData.lastName,
          email: userData.email,
          role: userData.role,
          dateofbirth: userData.dateOfBirth,
          gender: userData.gender,
          address: userData.address,
        },
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  static async getallusers(req, res) {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
          { role: 'driver' },
          { role: 'operator' },
        ],
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }


  static async forgot(req, res) {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('The email is not in the system') });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };


      const randomNumber = (Math.floor(Math.random() * (9999 - 999 + 1) + 999)).toString();
      await user.update({ resetlink: randomNumber });
      const forgottenMail = {
        to: email,
        from: 'el.ally741@gmail.com',
        subject: 'Reseting of the password on ACUBED platform',
        html: `<h2> Dear customer we are pleased to give you this code to reset your password, </h2><h2>Enter the code into the application</h2><h1>${randomNumber}</h1>`,
      };
      mail.send(forgottenMail);
      return res.status(201).json({
        status: 201,
        message: res.__('The reset code has been sent to your email successfully'),
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async verifyTheCode(req, res) {
    try{

      const { code, email } = req.body;

      const user = await Users.findOne({
        where: { email: email },
      });

      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('The email is not in the system') });
      }
    if (code !== user.resetlink ) {
      return res.status(403).json({
        status: 403,
        message: res.__('The code is different from what we sent you to the email'),
      });
    }

      return res.status(200).json({
        status: 200,
        Message: res.__('The code entered successfully'),
      });
    }
   catch(err){
     
       }
  
}

  static async resetPassword(req, res) {
    try{
      const { newpassword, confirmation, email } = req.body;

      const user = await Users.findOne({
        where: { email },
      }); 
  
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('The email is not in the system') });
      }

      if (newpassword !== confirmation) {
        return res.status(400).json({
          status: 400,
          message: res.__('The password and its confirmation are not the same'),
        });
      }

      const cryption = bcrypt.hashSync(newpassword, 10);
  
      await Users.update({ password: cryption, resetlink: '' }, {
        where: { email }
      });
  
      return res.status(200).json({
        status: 200,
        Message: res.__('Password changed Successfully'),
      });
    }
   catch(err){
     
       }
  
}
}
export default register;
