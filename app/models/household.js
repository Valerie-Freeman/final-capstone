'use strict';
module.exports = (sequelize, DataTypes) => {
  var Household = sequelize.define('Household', {
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, { tableName: "households" });
  Household.associate = function(models) {
    Household.hasOne(models.Household_Member, {
      foreignKey: 'household_id'
    });
    Household.hasMany(models.Task, {
      foreignKey: 'household_id'
    });
  };
  return Household;
};