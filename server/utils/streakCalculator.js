// utils/streakCalculator.js

module.exports.calculateStreak = (progressLog) => {
  if (!progressLog || progressLog.length === 0) {
    return 0;
  }

  // Create a set of unique dates (as strings in YYYY-MM-DD format) where progress was made.
  const successfulDays = new Set();
  progressLog.forEach(log => {
    if (log.value >= 1) { // Assuming a value of 1 or more means success
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);
      successfulDays.add(logDate.toISOString().split('T')[0]);
    }
  });

  if (successfulDays.size === 0) return 0;

  let streak = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Check backwards from today
  while (successfulDays.has(currentDate.toISOString().split('T')[0])) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};
