'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    value: DataTypes.INTEGER,
    repeat: DataTypes.INTEGER,
    household_id: DataTypes.INTEGER,
    is_new: DataTypes.BOOLEAN
  }, { tableName: "tasks" });
  Task.associate = function(models) {
    Task.belongsToMany(models.User, {
      through: {
        model: 'User_Task',
        unique: false
      },
      constraints: false
    });
  };
  return Task;
};