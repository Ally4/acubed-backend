import express from 'express';
import welcome from '../controllers/welcome';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - welcome message
 *     summary: welcome to phantom
 *     description: Display welcome message
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *             description: Welcome to phantom, a platform to facilitate the transportation mode in town!.
 * */

router.get('/', welcome);

export default router;
