const User = require('./../model/user');

async function validateUser({ username, email, userId }) {
    let errors = {};

    if (username) {
        const userWithUsername = await User.findOne({ username });
        if (userWithUsername) {
            errors.username = 'Username already exists';
        }
    }

    if (email) {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            errors.email = 'Email already exists';
        }
    }

    if (userId) {
        const userWithUserId = await User.findOne({ userId });
        if (userWithUserId) {
            errors.userId = 'User ID already exists';
        }
    }

    return errors;
}

module.exports = validateUser;
