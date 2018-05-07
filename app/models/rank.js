'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rank = sequelize.define('Rank', {
    title: DataTypes.STRING,
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER
  }, { tableName: "ranks", timestamps: false });
  Rank.associate = function(models) {
    // associations can be defined here
  };
  return Rank;
};