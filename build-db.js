'use strict';
const models = require("./app/models");
const { ranks } = require("./app/seeders/ranks");

models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create({
      username: "valerah7",
      name: "Valerie Freeman",
      email: "valerah7@email.com",
      password: "$2a$08$qeS.sXDmb0/3G6v1DeNlEevjQjLXByDtkcmmxlFkAlV9gAloYLG5a"
    });
  })
  .then(() => {
    return models.Rank.bulkCreate(ranks);
  })
  .then( () => {
    process.exit();
  });
