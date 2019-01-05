'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    
    user.hasMany(models.user_movie, {
      foreignKey: 'user_id'
    })
  };
  return user;
};