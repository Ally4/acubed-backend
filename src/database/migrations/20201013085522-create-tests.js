'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING
      },
      approximateWait: {
        type: Sequelize.STRING
      },
      // address: {
      //   type: Sequelize.STRING
      // },
      // category: {
      //   type: Sequelize.STRING
      // },
      facilities: {
        type: Sequelize.JSON
      },
      // profilPicture: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   defaultValue: 'https://res.cloudinary.com/bomayee/image/upload/v1699862446/acubed-profil-pictures/profile_oyc28d.png',
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tests');
  }
};