import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Buses extends Model {
    static associate(models) {
      Buses.belongsTo(models.Routes, {
        foreignKey: 'routeId',
        as: 'route',
        onDelete: 'CASCADE',
      });
    }
  }

  Buses.init({
    driver: DataTypes.STRING,
    busCompany: DataTypes.STRING,
    busPlate: DataTypes.STRING,
    type: DataTypes.STRING,
    routeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Buses',
  });
  return Buses;
};
