'use strict';
module.exports = (sequelize, DataTypes) => {
  var Household_Member = sequelize.define('Household_Member', {
    user_id: DataTypes.INTEGER,
    household_id: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN
  }, { tableName: "household_members" });
  Household_Member.associate = function(models) {
    
  };
  return Household_Member;
};