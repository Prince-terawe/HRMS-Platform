const express = require('express');
const Leave = require('../../model/leave');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/upcomingLeave/:projectName', authenticate, async (req, res) => {
  try {
    const { projectName } = req.params;
    const currentDate = new Date();

    // Find all users who are in the specified project
    const users = await User.find({ 'teamProject.projectName': projectName });

    if (!users.length) {
      return res.status(404).json({ error: 'No users found in this project' });
    }

    // Get the user IDs
    const userIds = users.map(user => user._id);

    // Find upcoming leaves for these users
    const leaves = await Leave.find({
      userId: { $in: userIds },
      startDate: { $gte: currentDate }
    });

    res.json({ msg: "Upcoming leaves fetched successfully!", leaves });
  } catch (error) {
    console.error('Error fetching upcoming leaves:', error);
    res.status(500).json({ error: 'Unable to fetch upcoming leaves', details: error.message });
  }
});

module.exports = router;
