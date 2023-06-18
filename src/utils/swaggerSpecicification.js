import path from 'path';
import os from 'os';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Phantom Api Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        name: `${os.hostname()}`
      },
      {
        url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
        name: `${os.hostname()}`
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '../routes/*.js')
  ],
}

export default swaggerOptions