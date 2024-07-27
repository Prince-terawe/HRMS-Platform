const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../../model/user');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        userId, username, password, email, role, department, position, hireDate, manager,
        firstName, dateOfBirth, phoneNumber, lastName, address, profileImage
    } = req.body;

    let emptyFields = [];

    if (!userId) emptyFields.push('userId');
    if (!username) emptyFields.push('username');
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
        const validationResponse = await axios.post('http://localhost:5000/api/users/createUser/validate', {
            username,
            email,
            userId
        });
        console.log(validationResponse.data.errors);
        // If there are validation errors, return them
        if (validationResponse.data.errors) {
            return res.status(400).json(validationResponse.data.errors);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId,
            username,
            password: hashedPassword, // Store hashed password
            email,
            role,
            department,
            position,
            hireDate,
            manager,
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
        res.json({ msg: "User added successfully!", user });
    } catch (error) {
        res.status(500).json({ error: "Unable to add User", details: error.message });
    }
});

module.exports = router;
