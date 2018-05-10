'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Task = sequelize.define('User_Task', {
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, { tableName: "user_tasks" });
  User_Task.associate = function(models) {
    User_Task.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    User_Task.belongsTo(models.Task, {
      foreignKey: 'task_id'
    });
  };
  return User_Task;
};