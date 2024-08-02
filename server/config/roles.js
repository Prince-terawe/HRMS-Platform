const roles = {
    Admin: {
      can: ['manageAny', 'viewAny', 'manageTeam'],
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
      can: ['requestLeave', 'viewOwn', 'updateOwn', 'viewTeam', 'viewAny'],
    },
  };
  
  module.exports = roles;
