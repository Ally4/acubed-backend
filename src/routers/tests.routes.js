// This is it
import express from 'express';
import testsController from '../controllers/TestsController';
import { validateTests } from '../validations/tests';
import { validateAddFacilities } from '../validations/addFacilities';
import multer from 'multer';


const upload = multer({dest: 'uploads/'});

const router = express.Router();

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
validateTests,
testsController.create);


router.patch('/add-facilities/:name',
validateAddFacilities,
upload.single('image'),
testsController.addFacilities);

router.get('/tests',
testsController.getAllTests);

router.get('/facilities/:name',
testsController.getAllFacilitiesOfTest);

export default router;
