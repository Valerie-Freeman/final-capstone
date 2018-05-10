'use strict';

module.exports.getUserHouseholds = (req, res, next) => {
  console.log('getUserHouseholds called in server controller'); 
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
      console.log('households in the .then in the server controller', households); 
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
      console.log('ERROR broadcasted in the server controller'); 
      next(err);
    });
};

module.exports.createHousehold = (req, res, next) => {
  console.log("createHousehold called in server controller");
  const { Household } = req.app.get('models');

  console.log('req.body', req.body ); 

  Household.create(req.body)
    .then(data => {
      console.log('WHAT HAPPENED??', data); 
      res.status(201).end();
    })
    .catch(err => {
      next(err);
    });
};