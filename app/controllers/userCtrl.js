'use strict';

module.exports.getAllUsers = (req, res, next) => {
  console.log('Get all users called in server controller'); 

  const { User } = req.app.get("models");

  User.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
};