'use strict';
const moment = require('moment');

// TODO: Go back and change everything to raw: true you idiot

let getUserTasksByUserId = (req, res, next, taskId) => {
  const { User_Task } = req.app.get('models');

  return User_Task.findAll({
    where: { task_id: taskId },
    raw: true
  });
};

module.exports.getAllHouseholdTasks = (req, res, next) => {
  const { Task } = req.app.get('models');
  let taskList = [];

  Task.findAll({
    where: { household_id: req.query.household }
    // raw: true
  })
    .then(tasks => {
      console.log('Tasks', tasks);
      tasks.forEach(task => {
        if (task.dataValues.is_new === true) {
          taskList.push(task.dataValues);
        } else if (task.dataValues.repeat !== 0) {
          console.log('DOING SOME STUFF');
          console.log(`Right now we are on ${task.dataValues.title} which has an id of ${task.dataValues.id}`);
          getUserTasksByUserId(req, res, next, task.dataValues.id)
            .then(userTasks => {
              console.log('This is what we get:', userTasks);
              let latest = null;
              for (let i = 0; i < userTasks.length; i++) {
                if (i === 0 || moment(userTasks[i].createdAt).isAfter(userTasks[i - 1])) {
                  latest = userTasks[0];
                }
              }
              console.log('This is the latest', latest);

              // This is the day the task should reapear on the taskList
              let displayDate = moment(latest).add(task.dataValues.repeat, 'days');

              console.log('This should be true:', moment('2018-05-15').isSameOrAfter(displayDate, 'day'));

              if (moment('2018-05-21').isSameOrAfter(displayDate, 'day')) {
                console.log('Is it here?', task.dataValues);
                taskList.push(task.dataValues);
              }
              return res.json(taskList);
            });
        }
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.createTask = (req, res, next) => {
  const { Task } = req.app.get('models');

  Task.create(req.body)
    .then(({ dataValues }) => {
      res.status(201).json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.updateTask = (req, res, next) => {
  const { Task } = req.app.get('models');

  Task.update(
    { is_new: false },
    { where: { id: req.body.taskId } }
  )
    .then(({ dataValues }) => {
      res.json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getOneTask = (req, res, next) => {
  const { Task } = req.app.get('models');

  Task.findById(req.query.task)
    .then(({ dataValues }) => {
      res.json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.createUserTask = (req, res, next) => {
  const { User_Task } = req.app.get('models');

  User_Task.create({
    user_id: req.user.id,
    task_id: req.body.taskId
  })
    .then(({ dataValues }) => {
      res.json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};
