'use strict';

module.exports.getUserHouseholds = (req, res, next) => { 
  const UserHousehold = req.app.get('models').Household_Member;
  const { Household } = req.app.get('models');
  let usersHouseholds = [];

  UserHousehold.findAll({
    where: { user_id: req.user.id },
    include: [{
      model: Household
    }]
  })
    .then(households => {
      if(households !== null) {
        households.forEach(household => {
          usersHouseholds.push(household.Household);
        });
        res.json(households);
      } else {
        res.json(null);
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports.createHousehold = (req, res, next) => {
  const { Household } = req.app.get('models');

  Household.create(req.body)
    .then( ({ dataValues }) => {
      console.log('WHAT HAPPENED??', dataValues); 
      res.status(201).json(dataValues);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.createHouseholdMember = (req, res, next) => {
  console.log('create household member called in server controller'); 
  const { Household_Member } = req.app.get('models');

  console.log('There is no user_id attribute:', !req.body.user_id); 
  
  if(!req.body.user_id) {
    Household_Member.create({
      household_id: req.body.household_id,
      user_id: req.user.id,
      isAdmin: true
    })
      .then( ({ dataValues }) => {
        console.log('WHAT HAPPENED?!', dataValues); 
        res.status(201).json(dataValues);
      })
      .catch(err => {
        next(err);
      });
  } else {
    Household_Member.create({
      household_id: req.body.household_id,
      user_id: req.body.user_id,
      isAdmin: false
    });
  }


};