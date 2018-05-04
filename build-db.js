'use strict';
let models = require("./app/models");

models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create({
      username: "valerah7",
      name: "Valerie Freeman",
      email: "valerah7@email.com",
      password: "$2a$08$qeS.sXDmb0/3G6v1DeNlEevjQjLXByDtkcmmxlFkAlV9gAloYLG5a"
    });
  })
  .then( () => {
    process.exit();
  });
