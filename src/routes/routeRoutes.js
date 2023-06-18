import express from 'express'
import routeController from '../controller/routeControllers'
import checkExist from '../middleware/checkExist'
import routeValidation from '../validation/routeValidation'
import protectMiddleware from '../middleware/protectRoutes'

const router = express()

/** 
 * @swagger
 * 
 * /api/v1/routes:
 *  post: 
 *   summary: create new route 
 *   description: Create new route in system
 *   tags: 
 *   - Route
 *   parameters: 
 *   - in: header 
 *     name: Authorization
 *     required: true
 *     type: string
 *     description: token to authorize
 *   - in: body
 *     name: Bus
 *     description: Enter route details
 *     schema: 
 *       type: object 
 *       properties:
 *        routeID: 
 *         type: integer
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        price: 
 *         type: integer
 *   responses:
 *    201: 
 *     description: Created Successfully
 *   
 *  get: 
 *    summary: get first 10 routes
 *    description: Retrieve 10 routes by default
 *    tags:
 *    - Route
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 * /api/v1/routes?page={page}&limit={limit}:
 *  get: 
 *    summary: get route by page and limit
 *    description: Retrieve route by page and limit
 *    tags:
 *    - Route
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: page
 *      required: true
 *      type: integer
 *      default: 1
 *      description: Enter page number
 *    - in: path
 *      name: limit
 *      required: true
 *      type: integer
 *      default: 10
 *      description: Enter limit number of routes per page
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 */

router
    .route('/')
    .get(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        routeController.getAllRoute
    )

    .post(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        routeValidation.routeValidate,
        checkExist.checkRoute,
        routeController.createNewRoute
    )

/** 
 * @swagger
 * 
 * /api/v1/routes/{id}:
 *  get: 
 *    summary: get route by id
 *    description: Retrieve route by id
 *    tags:
 *    - Route
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter route id
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 *     404: 
 *      description: ID Not Found
 *  patch: 
 *    summary: update existing route
 *    description: Return updated route
 *    tags:
 *    - Route
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter route id
 *    - in: body
 *      name: Bus
 *      description: Enter route details
 *      schema: 
 *       type: object 
 *       properties:
 *        routeID: 
 *         type: integer
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        price: 
 *         type: integer
 *    responses: 
 *     200: 
 *      description: updated Successfully
 *     400: 
 *      description: Invalid Input
 *  delete: 
 *    summary: delete existing route
 *    description: delete route
 *    tags:
 *    - Route
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter route id
 *    responses: 
 *     200: 
 *      description: Delete Successfully
 */

router
    .route('/:id')
    .get(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('driver','operator', 'admin'),
        checkExist.checkRouteID,
        routeController.getRoute
    )
    .patch(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkRouteID,
        routeValidation.routeValidate,
        checkExist.checkRoute,
        routeController.updateRoute
    )
    .delete(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkRouteID,
        routeController.deleteRoute
    )

export default router
