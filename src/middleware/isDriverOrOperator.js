import Models from '../database/models';

const { Users } = Models;

const isDriverOrOperator = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    res.status(403).json({
      status: 403,
      message: res.__('User with that email is not found'),
    });
    return false;
  }
  if (user.role !== 'operator' && user.role !== 'driver') {
    return res
      .status(403)
      .json({ status: 403, message: res.__('Your role is not a driver or operator') });
  }
};

export default isDriverOrOperator;
