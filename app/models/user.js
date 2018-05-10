'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING
  }, { tableName: "users" });
  User.associate = function(models) {
    User.hasOne(models.User_Task, {
      foreignKey: 'user_id'
    });
    User.hasOne(models.Household_Member, {
      foreignKey: 'user_id'
    });
  };
  return User;
};