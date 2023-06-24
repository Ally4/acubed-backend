import Models from '../database/models';

const { Users } = Models;

const isAdmin = async (req, res, next) => {
  const { email, role } = req.user;
  const user = await Users.findOne({ where: { email: req.user.email } });
  if (!user) {
    return res.status(403).json({
      status: 403,
      message: res.__('User with that email is not found'),
    });
  }
  if (role !== 'admin') {
    return res
      .status(403)
      .json({ status: 403, message: res.__('Please sign as the admin') });
  }
  next();
};

export default isAdmin;
