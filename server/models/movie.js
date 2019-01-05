'use strict';
module.exports = (sequelize, DataTypes) => {
  var movie = sequelize.define('movie', {
    
    title: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    premiereDate: DataTypes.DATE,
    voteAmount: DataTypes.INTEGER
    
    }, {});

  movie.associate = function(models) 
  {
      movie.hasMany(models.user_movie, {
        foreignKey: 'movie_id'
      })


  };
  return movie;
};