const roles = {
    Admin: {
      can: ['manageAny', 'viewAny'],
      inherits: ['HR'],
    },
    HR: {
      can: ['approveLeave', 'viewAny', 'cancelLeave'],
      inherits: ['Manager'],
    },
    Manager: {
      can: ['approveLeave', 'viewTeam', 'cancelLeave'],
      inherits: ['Employee'],
    },
    Employee: {
      can: ['requestLeave', 'viewOwn'],
    },
  };
  
  module.exports = roles;
