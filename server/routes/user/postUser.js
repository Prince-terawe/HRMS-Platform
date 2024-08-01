const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const validateUser = require('../../utils/validateUser'); // Import the validation function

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        empId, empname, password, email, role, department, position, hireDate, manager,
        firstName, dateOfBirth, phoneNumber, lastName, address, profileImage, teamProject
    } = req.body;
    console.log(empname);
    let emptyFields = [];

    if (!empId) emptyFields.push('empId');
    // if (!empname) emptyFields.push('empname');
    if (!password) emptyFields.push('password');
    if (!email) emptyFields.push('email');
    if (!department) emptyFields.push('department');
    if (!position) emptyFields.push('position');
    if (!hireDate) emptyFields.push('hireDate');
    if (!firstName) emptyFields.push('firstName');
    if (!dateOfBirth) emptyFields.push('dateOfBirth');
    if (!phoneNumber) emptyFields.push('phoneNumber');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the required fields', emptyFields });
    }

    try {
        const errors = await validateUser({ empname, email, empId });
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const FullName = `${firstName} ${lastName}`

        const newUser = new User({
            empId,
            empname: FullName,
            password: hashedPassword, // Store hashed password
            email,
            role,
            department,
            position,
            hireDate,
            manager,
            teamProject,
            profile: {
                firstName,
                lastName,
                dateOfBirth,
                profileImage,
                phoneNumber,
                address
            },
        });

        const user = await newUser.save();
        res.json({ msg: "Employee added successfully!", user });
    } catch (error) {
        res.status(500).json({ error: "Unable to add Employeessssssss", details: error.message });
    }
});

module.exports = router;
