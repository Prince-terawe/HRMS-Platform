// config/roles.js
const roles = {
    Admin: ['readAny', 'writeAny', 'updateAny', 'deleteAny'],
    HR: ['readAny', 'writeAny', 'updateAny'],
    Manager: ['readOwn', 'updateOwn'],
    Employee: ['readOwn']
};

module.exports = roles;
