module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    plate: DataTypes.STRING,
    company: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    commuters:DataTypes.INTEGER,
    availableSeats:DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    routeId:DataTypes.INTEGER
  }, {});
  
  Bus.associate = function(models) {
    
    Bus.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'driver',
      onDelete: 'CASCADE',
    });

    Bus.belongsTo(models.Route, {
      foreignKey: 'routeId',
      as: 'route',
      onDelete: 'CASCADE',
    });

  };
  return Bus;
};
