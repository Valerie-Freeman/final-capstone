'use strict';
module.exports = (sequelize, DataTypes) => {
  var Household_Member = sequelize.define('Household_Member', {
    isAdmin: DataTypes.BOOLEAN
  }, { tableName: "household_members" });
  Household_Member.associate = function(models) {
    Household_Member.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Household_Member.belongsTo(models.Household, {
      foreignKey: 'household_id'
    });
  };
  return Household_Member;
};