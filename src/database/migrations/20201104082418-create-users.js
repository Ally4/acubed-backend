module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },      
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my city!.',
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my occupation!.',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'edit@myEmail.com',
      },
      password: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '01/01/1111',
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my gender!.',
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my address!.',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my number',
      },
      profilPicture: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://asset.cloudinary.com/bomayee/1b04e4fc5c68d0a65edf7bf1400ff878',
      },
      role: {
        type: Sequelize.STRING,
      },
      confirmation: {
        type: Sequelize.STRING,
      },
      isLoggedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      resetlink: {
        type: Sequelize.STRING(2000),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
