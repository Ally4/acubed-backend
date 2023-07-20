import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    static associate(models) {
      Routes.hasMany(models.Buses, {
        foreignKey: 'routeId',
        as: 'Route',
        onDelete: 'CASCADE',
      });
    }
  }

  Routes.init({
    routeID: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    price: DataTypes.STRING,
    destination: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Routes',
  });
  return Routes;
};
