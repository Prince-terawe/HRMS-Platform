const express = require('express');
const getUsersFromTeam = require('./getTeam');
const getUsersOnLeave = require('./UsersOnLeave');
const addUserToTeam = require('./addToTeam');
const removeUserFromTeam = require('./removeFromTeam');

const router = express.Router();

router.use('/getUsersFromTeam', getUsersFromTeam);
router.use('/getUsersOnLeave', getUsersOnLeave);
router.use('/addUserToTeam', addUserToTeam);
router.use('/removeUserFromTeam', removeUserFromTeam);

module.exports = router;
