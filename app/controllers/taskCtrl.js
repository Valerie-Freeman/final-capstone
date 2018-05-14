'use strict';

module.exports.getAllHouseholdTasks = (req, res, next) => {
  const { Task } = req.app.get('models');
  let taskList = [];

  Task.findAll({
    where: { household_id: req.query.household}
  })
    .then(tasks => {
      tasks.forEach(task => {
        if(task.dataValues.is_new === true) {
          taskList.push(task.dataValues);
        } else {
          // TODO: write helper function for getting all user tasks by task id
          console.log('Do the other stuff'); 
        }
      });
      res.json(taskList);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.createTask = (req, res, next) => {
  const { Task } = req.app.get('models');

  Task.create(req.body)
    .then( ({ dataValues }) => {
      res.status(201).json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getOneTask = (req, res, next) => {
  const { Task } = req.app.get('models'); 

  Task.findById(req.query.task)
    .then( ({ dataValues}) => {
      res.json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};