const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Employee = require('./../../model/user');

const router = express.Router();

// Middleware
router.use(cors());
router.use(bodyParser.json());

router.get('/', (req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(404).json({ noEmployeesFound: 'No Employees found' }));
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(404).json({ noEmployeeFound: 'No Employee found' }));
});

router.post('/', (req, res) => {
    const { dateOfBirth, PhoneNumber, userId, firstName, password, email, role, position } = req.body;

    let emptyFields = [];

    if (!dateOfBirth) emptyFields.push('dateOfBirth');
    if (!userId) emptyFields.push('userId');
    if (!firstName) emptyFields.push('firstName');
    if (!PhoneNumber) emptyFields.push('PhoneNumber');
    if (!password) emptyFields.push('password');
    if (!email) emptyFields.push('email');
    if (!role) emptyFields.push('role');
    if (!position) emptyFields.push('position');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the required fields', emptyFields });
    }

    Employee.create(req.body)
        .then(employee => res.json({ msg: "Employee added successfully!", employee }))
        .catch(error => res.status(400).json({ error: "Unable to add Employee" }));
});

module.exports = router;