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
  let taskList = []; // This will be the array of current tasks sent to the client
  let promArr = []; // This will be for getting the user_tasks of each task

  // Get all all tasks created for the household
  Task.findAll({
    where: { household_id: req.query.household }
    // raw: true
  })
    .then(tasks => {
      tasks.forEach(task => { // Read all of the tasks to determine which tasks get sent to the client
        if (task.dataValues.is_new === true) { // If the task is new, push it to the task array to be sent to the client
          taskList.push(task.dataValues);
        } else if (task.dataValues.repeat !== 0) { // If the task is not new, but has been chosen to repeat 
          promArr.push(
            new Promise((resolve, reject) => {
              getUserTasksByUserId(req, res, next, task.dataValues.id)
                .then(userTasks => {
                  let latest = null; // This will be the latest created user_task date
                  // Find the latest date
                  for (let i = 0; i < userTasks.length; i++) {
                    if (i === 0 || moment(userTasks[i].createdAt).isAfter(userTasks[i - 1])) {
                      latest = userTasks[0].createdAt;
                    }
                  }
                  let displayDate = moment(latest).add(task.dataValues.repeat, 'days'); // This is the day the task should reapear on the taskList
                  // Check if current date is same or after the display date 
                  /***** Place a future fake date in here for testing *****/
                  if (moment().isSameOrAfter(displayDate, 'day')) {
                    resolve(task.dataValues);
                  } else {
                    resolve(null);
                  }
                });
            })
          );
        }
      });
      Promise.all(promArr)
        .then(tasks => {
          console.log('The tasks??', tasks); 
          tasks.forEach(task => {
            if(task !== null) {
              taskList.push(task);
            }
          });
          res.json(taskList);
        })
        .catch(message => {
          console.log(message); 
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
