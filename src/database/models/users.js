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
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateofbirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN,
    resetlink: DataTypes.STRING(2000),
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.associate = (models) => {
    Users.hasOne(models.Bus, {
      foreignKey: 'userId',
      as: 'driver',
      onDelete: 'CASCADE',
    });
  };
  return Users;
};
