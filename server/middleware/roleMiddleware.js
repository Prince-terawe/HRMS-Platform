const User = require('../model/user');
const roles = require('../config/roles');

const checkPermission = (permission) => {
    return async (req, res, next) => {
        const userId = req.userId; // Assumes the userId is set in req.userId by previous middleware (e.g., authentication middleware)
        // const userId = req.body.userId;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(403).json({ error: 'Access denied' });
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
