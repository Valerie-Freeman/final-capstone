'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Task = sequelize.define('User_Task', {
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, { tableName: "user_tasks" });
  User_Task.associate = function(models) {
    
  };
  return User_Task;
};