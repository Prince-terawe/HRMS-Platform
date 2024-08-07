function countWeekdays(startDate, endDate) {
    let count = 0;
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return count;
  }
  
  module.exports = { countWeekdays };
  