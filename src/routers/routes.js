import { Router } from 'express';
import controllers from '../controllers/routes';
import swagger from '../swagger/index';
import isAdmin from '../middleware/isAdmin';
import checkUser from '../middleware/checkUser';
import validator from '../validations/routesVal';

const router = Router();

/**
 * @swagger
 * /api/v1/routes:
 *   post:
 *     tags:
 *       - Routes
 *     name: Create Routes
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
 *               origin:
 *                 type: string
 *               price:
 *                 type: string
 *               destination:
 *                 type: string
 *           required:
 *             - origin
 *             - price
 *             - destination
 *     responses:
 *       '200':
 *             description: routes created successfull.
 *       '403':
 *             description: routes already exists in the system.
 * */

router.post('/', checkUser, isAdmin, validator.routesVal, controllers.createRoutes);

/**
 * @swagger
 * /api/v1/routes:
 *   get:
 *     tags:
 *       - Routes
 *     name: Retrieve all Routes
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
 *             description: Routes retrieved successufully.
 *       '403':
 *             description: There are no Routes registered in the system.
 */
router.get('/', checkUser, isAdmin, controllers.getRoutes);

/**
 * @swagger
 * /api/v1/routes/{id}:
 *   get:
 *     tags:
 *       - Routes
 *     name: Retrieve a Routes
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: id of the routes
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: route retrieved successufully.
 *       '403':
 *             description: There's no route registered in the system.
 * */
router.get('/:id', checkUser, isAdmin, controllers.getOneRoute);

/**
 * @swagger
 * /api/v1/routes/{id}:
 *   patch:
 *     tags:
 *       - Routes
 *     name: Update Routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: id of the route
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: string
 *           required:
 *             - price
 *     responses:
 *       '200':
 *             description: route updated successfull.
 *       '403':
 *             description: failed to update route.
 * */

router.patch('/:id', checkUser, isAdmin, validator. updRoutesVal, controllers.updateRoute);

/**
 * @swagger
 * /api/v1/routes/{id}:
 *   delete:
 *     tags:
 *       - Routes
 *     name: Delete Routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: id of the bus
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: route deleted successfull.
 *       '403':
 *             description: The route you're trying to delete doesn't exist in the system.
 * */
router.delete('/:id', checkUser, isAdmin,controllers.deleteRoute);

router.use('/api-docs', swagger);

export default router;