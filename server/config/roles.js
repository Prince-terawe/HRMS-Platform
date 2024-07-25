const roles = {
    Admin: {
      can: ['manageAny', 'viewAny'],
      inherits: ['HR Manager'],
    },
    'HR Manager': {
      can: ['approveLeave', 'viewAny', 'cancleLeave'],
      inherits: ['Manager'],
    },
    Manager: {
      can: ['approveLeave', 'viewTeam', 'cancleLeave'],
      inherits: ['Employee'],
    },
    Employee: {
      can: ['requestLeave', 'viewOwn'],
    },
  };
  
  module.exports = roles;
