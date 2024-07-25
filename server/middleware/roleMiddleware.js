// middleware/roleMiddleware.js
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

            const rolePermissions = roles[user.role];
            if (!rolePermissions.includes(permission)) {
                return res.status(403).json({ error: 'Access denied' });
            }

            next();
        } catch (error) {
            console.error('Permission check error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    };
};

module.exports = checkPermission;
