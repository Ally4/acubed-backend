import dotenv from 'dotenv';
import axios from 'axios';
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
import cloudinary from '../cloudinary/cloudinary'
const fs = require('fs');

const { Op } = require('sequelize');

dotenv.config();
mail.setApiKey(process.env.SENDGRID);
const { Users } = Models;

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-profil-pictures'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}

class register {
  static async signup(req, res) {
    try {
      const {
        user,
        // email,
        // firstName,
        // lastName, 
        password,
        confirmPassword,
        // phoneNumber
      } = req.body;
      const id = uuidv4();
      const inSystem = await Users.findOne({
        where: { user },
      });
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('Check well the passwords you are inserting') });
      }
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The email or phone number is already in the system') });
      }

      const payload = { user };
      const accessToken = encode(payload);
      
      const thePassword = bcrypts.hashSync(password, 10);


      const newUser = await Users.create({
        id,
        user,
        // email,
        // firstName,
        // lastName,
        password: thePassword,
        // phoneNumber
      });
      // const newUserDisplay = {
      //   id: newUser.id,
      //   email: newUser.email,
      //   firstName: newUser.firstName,
      //   lastName: newUser.lastName,
      //   token: accessToken,
      // };
      
      await Users.update({ isLoggedIn: true },
        {where: { user } });

      return res.status(201).json({
        status: 201,
        message: res.__('user created successfully'),
        id: newUser.id,
        user: newUser.user,
        name: newUser.firstName,
        // email: newUser.email,
        // firstName: newUser.firstName,
        // name: newUser.lastName,
        token: accessToken,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
  
  static async login(req, res) {
    const { user, password } = req.body;
    try {
      const isUser = await Users.findOne({
        where: { user },
      });
      if (!isUser) {
        return res.status(404).json({
          status: 404,
          message: 'Wrong email, please enter the registered email.',
        });
      }

      if (!bcrypt.compareSync(password, isUser.password)) {
        return res.status(400).json({
          status: 400,
          message: res.__('One of you credentials must be wrong, please verify your credentials.'),
        });
      }
      const payload = { user };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { user } });

      const LoggedInUser = await Users.findOne({
        where: { user }
      });

      return res.status(200).json({
        status: 200,
        username: req.body.user,
        name: isUser.firstName,
        message: res.__('logged In successfully'),
        token: accessToken,
        userLoggedIn: LoggedInUser.isLoggedIn
      });
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
    


  static async updateProfile(req, res) {
    try {
      const { user } = req.user;
      const updatedField = await Users.update(req.body, {
        where: { user },
        returning: true,
        plain: true,
      });
      const userData = updatedField[1];

      // for cloudinary image upload 
      const result = await uploadImage(req.file
        // , {folder:'acubed-profil-pictures'}
        );

        await Users.update(
          {profilPicture: result.secure_url},
          {where: { user }},
        );

      return res.status(200).json({
        status: 200,
        message: 'user updated',
        data: {
          firstname: userData.firstName,
          lastname: userData.lastName,
          city: userData.city,
          occupation: userData.occupation,
          email: userData.email,
          role: userData.role,
          dateofbirth: userData.dateOfBirth,
          gender: userData.gender,
          address: userData.address,

          // have to up on profilPicture result.secure_url
          profilPicture: result.secure_url



        },
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }


  
static async getAllUsers(req, res) {
  try {
    const users = await Users.findAll({
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
  } catch (error) {
    console.error('Error fetching users:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}


static async getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await Users.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('no User with that Id');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


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

      // const payload = {
      //   id: user.id,
      //   email: user.email,
      //   role: user.role,
      // };


      const payload = { email, role: user.role, name: user.firstName };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { email } });


      const randomNumber = (Math.floor(Math.random() * (9999 - 999 + 1) + 999)).toString();
      await user.update({ resetlink: randomNumber });
      const forgottenMail = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: 'Reseting of the password on ACUBED platform',
        html: `<h2> Dear customer we are pleased to give you this code to reset your password, </h2><h2>Enter the code into the application</h2><h1>${randomNumber}</h1>`,
      };
      mail.send(forgottenMail);

      return res.status(201).json({
        status: 201,
        token: accessToken,
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



      const payload = { email, role: user.role, name: user.firstName };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { email } });



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
        token: accessToken,
        Message: res.__('The code entered successfully'),
      });
    }
   catch(err){
    return res.status(500).json({
      error: err.message,
       })
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
      const payload = { email, role: user.role };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { email } });
      return res.status(200).json({
        status: 200,
        Message: res.__('Password changed Successfully'),
        token: accessToken
      });
    }
   catch(error){
    return res.status(500).json({
      error: error.message,
       })
      }
    }

    }
export default register;
