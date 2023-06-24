import path from 'path';
import os from 'os';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Phantom',
      version: '1.0.0',
      license: {},
      contact: {},
    },
    components: {},
    security: {},
    servers: [
      { url: 'http://localhost:3020', name: `${os.hostname()}` },
      {
        url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
        name: `${os.hostname()}`,
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routers/*.js')],
};
export default swaggerOptions;
