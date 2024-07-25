const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');
const checkPermission = require('../../middleware/roleMiddleware');
 const authorisation = require('../../middleware/authMiddleware');
 
const router = express.Router();
 
router.put('/:id', authorisation, checkPermission('approveLeave'), async (req, res) => {
    try {
      const leaveId = req.params.id;
      const userId = req.userId; // Assuming user ID is stored in req.user
 
      const leave = await Leave.findById(leaveId);
      if (!leave) {
        return res.status(404).json({ error: 'Leave not found' });
      }
 
      leave.status = 'approved';
      leave.approvedOn = new Date();
      leave.approvedBy = userId;
 
      await leave.save();
 
      res.json({ message: 'Leave approved successfully', leave });
    } catch (error) {
      console.error('Error approving leave:', error);
      res.status(500).json({ error: 'Unable to approve leave', details: error.message });
    }
  });  
 
module.exports = router;
 