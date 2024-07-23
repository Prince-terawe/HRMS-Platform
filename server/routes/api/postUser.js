const express = require('express');
const User = require('./../../model/user');

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
        const newUser = new User({
            userId,
            username,
            password,
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
            }
        });

        const user = await newUser.save();
        res.json({ msg: "User added successfully!", user });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(400).json({ error: "Unable to add User", details: error.message });
    }
});

module.exports = router;
