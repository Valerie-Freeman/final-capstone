'use strict';
module.exports = (sequelize, DataTypes) => {
  var Household = sequelize.define('Household', {
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, { tableName: "households" });
  Household.associate = function(models) {
    Household.belongsToMany(models.User, {
      through: {
        model: 'Household_Member',
      }
    });
  };
  return Household;
};