'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('healthFacilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      // tests: {
      //   type: Sequelize.JSON
      // },
      profilPicture: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/bomayee/image/upload/v1701846591/acubed-facility-images/med_n2ybt7.png',
      },
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
    await queryInterface.dropTable('healthFacilities');
  }
};