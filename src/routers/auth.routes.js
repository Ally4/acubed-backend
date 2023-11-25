// This is it
import express from 'express';
import userController from '../controllers/registcontroller';
import checkUser from '../middleware/checkUser';
import users from '../controllers/users';
// import users from '../controllers/users';
import { validationSignup } from '../validations/signup';
import { validateSignin } from '../validations/signin';
import validRole from '../validations/validRole';
import { validationUpdateProfil } from '../validations/updateProfile';
import { validationErrorForgotten } from '../validations/validationErrorForgotten';
import { validationErrorResetPassword } from '../validations/validationErrorReset';
import { validationErrorVerifyCode } from '../validations/verifyTheCode';
import isAdmin from '../middleware/isAdmin';
import multer from 'multer';
// import isDriverOrOperator from '../middleware/isDriverOrOperator';


const upload = multer({dest: 'uploads/'});

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     security: []
 *     summary: Login
 *     description: users can log into their accounts
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               token: string
 *     responses:
 *       200:
 *         description: login successfully
 */

router.post('/login', validateSignin, userController.login);

/**
* @swagger
* /api/v1/auth/register:
*   post:
*     tags:
*       - Users
*     name: Signup
*     summary: Signup a user in a system
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: x-access-token
*         in: header
*         description: jwt token of the user
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstname:
*                 type: string
*               lastname:
*                 type: string
*               email:
*                 type: string
*               dateofbirth:
*                 type: string
*               gender:
*                 type: string
*               address:
*                 type: string
*               role:
*                 type: string
*     responses:
*       '201':
*             description: user created successfully.
*       '400':
*             description: Bad request.
*       '409':
*             description: The email is already in the system.
* */

router.post('/register', 
// checkUser, 
// isAdmin, 
validationSignup,
 userController.signup);

/**
* @swagger
* /api/v1/auth/forgotten-link:
*   post:
*     tags:
*       - Users
*     name: Forgot
*     summary: The link to reset the password
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*     responses:
*       '201':
*             description: the link has been sent successfully to the provided email.
*       '400':
*             description: Bad request.
* */

router.post('/forgotten-link', 
// isDriverOrOperator, 
validationErrorForgotten, 
userController.forgot);

/**
* @swagger
* /api/v1/auth/reset-password/{resetToken}:
*   put:
*     tags:
*       - Users
*     name: reset password
*     summary: reset user password
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: resetToken
*         in: path
*         description: the address of resetting the password
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               newpassword:
*                 type: string
*                 example: 'put here your new password'
*               confirmation:
*                 type: string
*                 example: 'confirm here your new password'
*     responses:
*       '200':
*             description: password reset successfully.
*       '400':
*             description: newpassword is required.
* */

router.post('/verify-code', 
validationErrorVerifyCode, 
userController.verifyTheCode);

/**
* @swagger
* /api/v1/auth/reset-password/{resetToken}:
*   put:
*     tags:
*       - Users
*     name: reset password
*     summary: reset user password
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: resetToken
*         in: path
*         description: the address of resetting the password
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               newpassword:
*                 type: string
*                 example: 'put here your new password'
*               confirmation:
*                 type: string
*                 example: 'confirm here your new password'
*     responses:
*       '200':
*             description: password reset successfully.
*       '400':
*             description: newpassword is required.
* */

router.put('/reset-password', validationErrorResetPassword, userController.resetPassword);
/**
* @swagger
* /api/v1/auth/updateProfile:
*   patch:
*     tags:
*       - Users
*     name: updateProfile
*     summary: updating info about the user
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: x-access-token
*         in: header
*         description: jwt token of the user
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstname:
*                 type: string
*               lastname:
*                 type: string
*               email:
*                 type: string
*               dateofbirth:
*                 type: string
*               gender:
*                 type: string
*               address:
*                 type: string
*     responses:
*       '201':
*             description: user updated successfully.
*       '400':
*             description: Bad request.
* */

router.patch('/update-profile', 
checkUser, 
validationUpdateProfil,
upload.single('image'),
userController.updateProfile);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - Users
 *     name: logout
 *     summary: Log out auth-user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: User is successfully logged out
 * */

router.get('/logout', checkUser, userController.logout);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     tags:
*       - Users
 *     description: Get user by Id
 *     summary: get user by id
 *     parameters:
 *          - name: userId
 *            description: id of user to get by
 *            in: path
 *            type: integer
 *            required: true
 *          - name: x-access-token
 *            in: header
 *            description: jwt token of the user
 *     responses:
 *       200:
 *         description: user successfully found
 *       401:
 *         description: you don't permissions
 * */
router.get('/:userId', userController.getUserById);
// router.get('/:userId', users.getUserbyId);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     description: get All users
 *     summary: get all users
 *     name: Retrieve all Users
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: Users retrieved successufully.
 *       '403':
 *             description: There are no Users registered in the system.
 */
router.get('/', userController.getAllUsers);
// router.get('/', users.getUsers);
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     description: Update user by Id
 *     summary: update user role
 *     parameters:
 *          - name: userId
 *            description: id of user to update by
 *            in: path
 *            type: integer
 *            required: true
 *          - name: x-access-token
 *            in: header
 *            description: jwt token of the user
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  role:
 *                      type: string
 *                required:
 *                  - role
 *     responses:
 *       200:
 *         description: User role created
 *       401:
 *         description: you don't permissions
 *       400:
 *         descriptuion: Bad request
 * */


// router.patch('/:userId', checkUser, isAdmin, validRole, users.updateUser);
// router.patch('/:userId', checkUser, isAdmin, validRole, users.updateUser);

/**
* @swagger
* /api/v1/auth/allusers:
*   get:
*     tags:
*       - Users
*     name: Allusers
*     summary: Get All drivers and operator
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: x-access-token
*         in: header
*         description: jwt token of the user
*     responses:
*       '201':
*             description: user updated successfully.
*       '400':
*             description: Bad request.
* */

router.get('/allusers', userController.getAllUsers);
export default router;
