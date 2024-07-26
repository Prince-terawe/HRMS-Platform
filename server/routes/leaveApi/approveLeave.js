const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');
const checkPermission = require('../../middleware/permissions');
 const authenticate = require('../../middleware/auth');
 
const router = express.Router();
 
router.put('/:id', authenticate, checkPermission('approveLeave'), async (req, res) => {
    try {
      const leaveId = req.params.id;
      const userId = req.userId; // Assuming user ID is stored in req.user
 
      const leave = await Leave.findById(leaveId);
      if (!leave) {
        return res.status(404).json({ error: 'Leave not found' });
      }
      const empId = leave.connectionId;

      const user = await User.findById(empId);
      if(!user){
        return res.sendStatus(404).json({error: "User with leave not found" });
      }

      if(leave.leaveType === 'casualLeave') user.leaveBalance.casualLeave -= 1;
      else if(leave.leaveType === 'sickLeave') user.leaveBalance.sickLeave -= 1;
      else if(leave.leaveType === 'paidLeave') user.leaveBalance.paidLeave -= 1;
      else user.leaveBalance.workFromHome -= 1;

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
 