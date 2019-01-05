'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
        validate:{
          isEmail : true
        }
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING(255)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
