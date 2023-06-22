module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      // gender: DataTypes.STRING,
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Bus, {
      foreignKey: "userId",
      as: "driver",
      onDelete: "CASCADE",
    });
  };
  return User;
};
