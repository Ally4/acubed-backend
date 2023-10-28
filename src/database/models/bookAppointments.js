import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class bookAppointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookAppointments.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.STRING,
    address: DataTypes.STRING,
    healthFacility: DataTypes.STRING,
    department: DataTypes.STRING,
    particularDoctor: DataTypes.STRING,
    rendezVous: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bookAppointments',
  });
  return bookAppointments;
};
