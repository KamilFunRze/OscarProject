'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rateComment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      wantToSee: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      movie_id: {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
          as: 'movie_id',
        },
      },

      user_id: {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'user_id',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_movies');
  }
};