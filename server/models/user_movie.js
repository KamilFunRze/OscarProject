'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_movie = sequelize.define('user_movie', {
    score: DataTypes.INTEGER,
    rateComment: DataTypes.TEXT,
    wantToSee: DataTypes.BOOLEAN
  });
  user_movie.associate = function(models) {

  };
  return user_movie;
};