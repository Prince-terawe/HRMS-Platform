const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/upcomingLeave/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log({"Projectid":id});
    const currentDate = new Date();

    // Find all users in the specified team project
    const users = await User.find({ teamProject: id });
    // console.log(users);
    if (!users.length) {
      return res.status(404).json({ error: 'No users found in this team project' });
    }

    // Get the user IDs
    const userIds = users.map(user => user._id);
    // console.log(userIds);

    // Find upcoming leaves for these users
    const leaves = await Leave.find({
      connectionId: { $in: userIds },
      startDate: { $gte: currentDate }
    });

    res.json(leaves);
  } catch (error) {
    console.error('Error fetching upcoming leaves:', error);
    res.status(500).json({ error: 'Unable to fetch upcoming leaves', details: error.message });
  }
});

module.exports = router;
