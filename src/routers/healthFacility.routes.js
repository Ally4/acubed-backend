// This is it
import express from 'express';
import healthFacilityController from '../controllers/healthFacilityAndTestsController';
import { validateHealthFacility } from '../validations/healthFaciility';
import { validateAddTests } from '../validations/addTests';
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
validateHealthFacility,
upload.single('image'),
healthFacilityController.create);


router.patch('/add-tests/:name',
validateAddTests,
healthFacilityController.addTests);

router.get('/facilities',
healthFacilityController.getAllHealthFacilities);

router.get('/tests/:name',
healthFacilityController.getAllTestsOfFacility);

export default router;
