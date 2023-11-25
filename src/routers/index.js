import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../utils/swaggerOptions';
import welcomeRoute from './welcome.routes';
import userRoute from './auth.routes';
import healthFacilityRoute from './healthFacility.routes';
import orderTestsRoute from './orders.routes';
import bookAppointmentsRoute from './bookAppointments.routes';
import resultsRoute from './results.routes';

const swaggerDoc = swaggerJsdoc(swaggerOptions);
const router = Router();

router.use('/', welcomeRoute);

router.use('/api/v1/auth', userRoute);

router.use('/api/v1/health-facility', healthFacilityRoute);

router.use('/api/v1/tests', orderTestsRoute);

router.use('/api/v1/book', bookAppointmentsRoute);

router.use('/api/v1/result', resultsRoute);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

export default router;
