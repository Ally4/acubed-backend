import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tests.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    approximateWait: DataTypes.STRING,
    // address: DataTypes.STRING,
    // category: DataTypes.STRING,
    // profilPicture: DataTypes.STRING,
    facilities: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'tests',
  });
  return tests;
};
