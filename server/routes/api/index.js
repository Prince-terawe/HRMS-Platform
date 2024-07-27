const express = require('express');
const router = express.Router();

const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const postUser = require('./postUser');
const putUser = require('./putUser');
const validateUser = require('./validateUser');
const deleteUser = require('./deleteUser');
const loginUser = require('./login');

router.use('/getAllUsers', getUsers);
router.use('/', getUserById);
router.use('/createUser', postUser);
router.use('/updateUser', putUser);
router.use('/createUser/validate', validateUser);
router.use('/deleteUser', deleteUser);
router.use('/login', loginUser);

module.exports = router;
