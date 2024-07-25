const User = require('../model/user');
const roles = require('../config/roles');

const checkPermission = (action) => async (req, res, next) => {
  try {
    const userId = req.body.userId ; // Adjust as per your use case
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRole = user.role;
    const rolePermissions = roles[userRole];

    if (!rolePermissions) {
      return res.status(403).json({ error: 'Role not found' });
    }

    if (rolePermissions.can.includes(action)) {
      return next();
    }

    let inheritedRole = rolePermissions.inherits;
    while (inheritedRole) {
      if (roles[inheritedRole].can.includes(action)) {
        return next();
      }
      inheritedRole = roles[inheritedRole].inherits;
    }

    return res.status(403).json({ error: 'Permission denied' });
  } catch (error) {
    console.error('Permission check error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = checkPermission;
