const express = require('express');
const getUsersFromTeam = require('./getTeam');
const getUsersOnLeave = require('./UsersOnLeave');
const addUserToTeam = require('./addToTeam');
const removeUserFromTeam = require('./removeFromTeam');
const teamLeaves = require('./teamLeaves');
// const getTeams = require('./getTeams');

const router = express.Router();

router.use('/getUsersFromTeam', getUsersFromTeam);
router.use('/getUsersOnLeave', getUsersOnLeave);
router.use('/addUserToTeam', addUserToTeam);
router.use('/removeUserFromTeam', removeUserFromTeam);
router.use('/', teamLeaves);
// router.use('/getTeams', getTeams);

module.exports = router;
