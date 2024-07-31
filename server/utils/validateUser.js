const User = require('./../model/user');

async function validateUser({ empname, email, empId }) {
    let errors = {};

    if (empname) {
        const userWithEmployeename = await User.findOne({ empname });
        if (userWithEmployeename) {
            errors.empname = 'EmployeeName already exists';
        }
    }

    if (email) {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            errors.email = 'Email already exists';
        }
    }

    if (empId) {
        const userWithEmpId = await User.findOne({ empId });
        if (userWithEmpId) {
            errors.empId = 'EmployeeId already exists';
        }
    }

    return errors;
}

module.exports = validateUser;
