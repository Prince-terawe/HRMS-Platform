const express = require('express');
const router = express.Router();

const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const postUser = require('./postUser');
const putUser = require('./putUser');
const deleteUser = require('./deleteUser');
const loginUser = require('./login');

router.use('/', getUsers);
router.use('/', getUserById);
router.use('/', postUser);
router.use('/', putUser);
router.use('/', deleteUser);
router.use('/login', loginUser);

module.exports = router;
