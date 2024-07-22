const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Employee = require('../../model/user');

const router = express.Router();

// Middleware
router.use(cors());
router.use(bodyParser.json());


router.get('/', (req, res) => {
    console.log(req.body)
    res.send('hello')
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(404).json({ noEmployeesFound: 'No Employees found' }));
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(404).json({ noEmployeeFound: 'No Employee found' }));
});

router.post('/', async (req, res) => {

    try {
        let employee = await Employee.create(req.body);
        res.json({ msg: "Employee added successfully!", employee });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(400).json({ error: "Unable to add Employee", details: error.message });
    }

});

module.exports = router;
