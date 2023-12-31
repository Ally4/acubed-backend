import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    user: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    city: DataTypes.STRING,
    occupation: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    role: DataTypes.STRING,
    confirmation: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN,
    resetlink: DataTypes.STRING(2000),
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
