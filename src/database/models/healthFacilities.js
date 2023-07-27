import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class healthFacilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  healthFacilities.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    category: DataTypes.STRING,
    tests: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'healthFacilities',
  });
  return healthFacilities;
};
