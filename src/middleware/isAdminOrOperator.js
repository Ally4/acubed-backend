import Models from '../database/models';

const { Users } = Models;

const isAdminOrOperator = async (req, res, next) => {
    const { email, role } = req.user;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(403).json({
      status: 403,
      message: res.__('User with that email is not found'),
    });
  }
  if (role !== 'operator' && role !== 'admin') {
    return res
      .status(403)
      .json({ status: 403, message: res.__('Please sign as an operator') });
  }
  next();
};

export default isAdminOrOperator;
