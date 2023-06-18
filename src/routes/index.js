import express from 'express'
import userRoute from './authRouters'
import busRoute from '../routes/busRoutes'
import roadRoute from '../routes/routeRoutes'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../utils/swaggerSpecicification';

const router = express()

const swaggerDoc = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router.get('/', (req, res) => {
    res.status(200).json({
        message: res.__('welcome')
    })
})

router.use('/api/v1/auth', userRoute)
router.use('/api/v1/buses', busRoute)
router.use('/api/v1/routes',roadRoute)

router.all('*', (req, res) => {
    res.status(404).json({
        message: res.__("404")
    })
})

export default router
