const express = require('express');
const router = express.Router();

const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const postUser = require('./postUser');
const putUser = require('./putUser');
const deleteUser = require('./deleteUser');
const getManagers = require('./getManagers')
const userProfile = require('./userProfile')

router.use('/', getUsers);
router.use('/getUserById', getUserById);
router.use('/', postUser);
router.use('/', putUser);
router.use('/', deleteUser);
router.use('/managers', getManagers);
router.use('/userProfile', userProfile)

module.exports = router;
