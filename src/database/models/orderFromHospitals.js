import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class orderFromHospitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderFromHospitals.init({
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.STRING,
    hospitalName: DataTypes.STRING,
    department: DataTypes.STRING,
    roomNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'orderFromHospitals',
  });
  return orderFromHospitals;
};
