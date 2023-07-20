import app from '../languages/config';

const welcome = app.get('/', (req, res) => {
  res.status(200).json({
    status: res.__(200),
    message: res.__('Welcome to acubed, a platform to facilitate the transportation your samples for a great, faster and right testing!.'),
  });
});

export default welcome;
