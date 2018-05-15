'use strict';
const moment = require('moment');

/*********************** HELPER FUNCITONS **********************/
// Get all user_task relationships for task
let getUserTasksByTaskId = (req, res, next, taskId) => {
  const { User_Task } = req.app.get('models');

  return User_Task.findAll({
    where: { task_id: taskId },
    raw: true
  });
};

// Get all user_task relationships for one user on one household
let getUserTasksByUserId = (req, res, next, userId, householdId) => {
  const { User_Task } = req.app.get('models');
  const { Task } = req.app.get('models');

  return User_Task.findAll({
    where: { user_id: userId },
    include: [{
      model: Task, 
      where: { household_id: householdId}
    }]
  });
};

// Get all mumbers on a household
let getMembers = (req, res, next, householdId) => {
  const { Household_Member } = req.app.get('models');
  const { User } = req.app.get('models');

  return Household_Member.findAll({
    where: {household_id: householdId},
    include: [{
      model: User
    }]
  });
};

// Get all of the ranks
let getRanks = (req, res, next) => {
  const { Rank } = req.app.get('models');

  return Rank.findAll({
    raw: true
  });
};
/**************************************************************/

// Get all the current tasks for a household
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
              getUserTasksByTaskId(req, res, next, task.dataValues.id)
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


// Get all tasks that have been completed and not set to repeat
module.exports.getCompletedTasks = ({app, query: { household }}, res, next) => {
  const { Task } = app.get('models');

  Task.findAll({
    where: {
      household_id: household,
      is_new: false,
      repeat: 0
    },
    raw: true
  })
    .then(tasks => { 
      res.json(tasks);
    })
    .catch(err => {
      next(err);
    });
};

// Create a new task
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

// Set is_new on a task to either true or false
module.exports.updateTask = ({ app, body: { taskId, bool }}, res, next) => {
  const { Task } = app.get('models');

  Task.update(
    { is_new: bool },
    { where: { id: taskId } }
  )
    .then(({ dataValues }) => {
      res.json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

// Get one task by its id
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

// Create a new user_task relationship
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


module.exports.getLeaderboardData = (req, res, next) => {
  let promArr = [];
  getMembers(req, res, next, req.query.household)
    .then(members => {
      members.forEach(member => {
        promArr.push(
          new Promise((resolve, reject) => {
            getUserTasksByUserId(req, res, next, member.user_id, req.query.household)
              .then(completedTasks => {
                let points = 0;
                let tasks = 0;
                let title = null;
                let level = 0;
                let is_current = member.dataValues.user_id === req.user.id ? true : false;
                let monthPoints = 0;
                let monthTasks = 0;
                // Add all points earned and tasks completed
                completedTasks.forEach(completedTask => { 
                  tasks++;
                  points += completedTask.dataValues.Task.dataValues.value;
                  // Get the points and tasks for the month
                  if(moment().isSame(completedTask.dataValues.createdAt, 'month')) {
                    monthPoints += completedTask.dataValues.Task.dataValues.value;
                    monthTasks ++;
                  }
                });
                getRanks(req, res, next)
                  .then(ranks => { 
                    ranks.forEach(rank => {
                      if(points >= rank.min && points <= rank.max) {
                        title = rank.title;
                        level = rank.id;
                      }
                    });
                    resolve({
                      username: member.dataValues.User.dataValues.username,
                      points,
                      title,
                      level,
                      tasks,
                      is_current,
                      monthPoints,
                      monthTasks
                    });
                  });
              });
          })
        );
      });
      return Promise.all(promArr);
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
};
