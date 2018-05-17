'use strict';

const { Router } = require('express');
const router = Router();

const {
  getUserHouseholds,
  createHousehold,
  createHouseholdMember,
  getHousehold
} = require("../controllers/householdCtrl");

router.get("/households", getUserHouseholds);
router.post("/households", createHousehold);
router.get("/household", getHousehold);
router.post("/householdmember", createHouseholdMember);

module.exports = router;