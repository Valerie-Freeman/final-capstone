'use strict';

// module.exports.getAllHouseholdTasks = (req, res, next) => {
//   const { Task } = req.app.get('models');

// };

module.exports.createTask = (req, res, next) => {
  const { Task } = req.app.get('models');

  console.log('This is what it gets in the server controller function:', req.body); 

  Task.create(req.body)
    .then( ({ dataValues }) => {
      console.log('WHAT HAPPENED?!', dataValues); 
      res.status(201).json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};