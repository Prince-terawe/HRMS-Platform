const roles = {
    Admin: {
      can: ['manageAny', 'viewAny'],
      inherits: ['HR'],
    },
    HR: {
      can: ['manageLeave', 'viewAny', 'updateAny'],
      inherits: ['Manager'],
    },
    Manager: {
      can: ['manageLeave', 'viewTeam'],
      inherits: ['Employee'],
    },
    Employee: {
      can: ['requestLeave', 'viewOwn', 'updateOwn'],
    },
  };
  
  module.exports = roles;
