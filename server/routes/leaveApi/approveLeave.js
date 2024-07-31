const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');
const checkPermission = require('../../middleware/permissions');
const authenticate = require('../../middleware/auth');
 
const router = express.Router();
 
router.put('/:id', authenticate, checkPermission(['manageLeave']), async (req, res) => {
  try {
      const leaveId = req.params.id;
      const empId = req.user.empId;

      const leave = await Leave.findById(leaveId);
      if (!leave) {
          return res.status(404).json({ error: 'Leave not found' });
      }

      const employeeId = leave.connectionId;
      const user = await User.findById(employeeId);
      if (!user) {
          return res.status(404).json({ error: 'User with leave not found' });
      }

      if(leave.status === 'approve'){
        res.json({ message: 'Leave already approved', leave });
      }

      if(leave.leaveType === 'casualLeave') user.leaveBalance.casualLeave -= leave.numberOfDays;
      else if(leave.leaveType === 'sickLeave') user.leaveBalance.sickLeave -= leave.numberOfDays;
      else if(leave.leaveType === 'paidLeave') user.leaveBalance.paidLeave -= leave.numberOfDays;
      else user.leaveBalance.workFromHome -= leave.numberOfDays;

      leave.status = 'approved';
      leave.approvedOn = new Date();
      leave.approvedBy = empId;
 
      await user.save();
      await leave.save();
 
      res.json({ message: 'Leave approved successfully', leave });
    } catch (error) {
      console.error('Error approving leave:', error);
      res.status(500).json({ error: 'Unable to approve leave', details: error.message });
  }
});  
 
module.exports = router;
 