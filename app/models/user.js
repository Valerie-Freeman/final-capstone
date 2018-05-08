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
    User.belongsToMany(models.Task, {
      through: {
        model: 'User_Task',
        unique: false
      },
      constraints: false
    });
    User.belongsToMany(models.Household, {
      through: {
        model: 'Household_Member'
      }
    });
  };
  return User;
};