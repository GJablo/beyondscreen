// utils/streakCalculator.js

module.exports.calculateStreak = (progressLog) => {
  if (!progressLog || progressLog.length === 0) return 0;

  // Sort descending by date
  const sortedLogs = [...progressLog].sort((a, b) => new Date(b.date) - new Date(a.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize

  let streak = 0;

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].date);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date();
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (
      logDate.getTime() === expectedDate.getTime() &&
      sortedLogs[i].value >= 1 // Optional: only count if value ≥ 1
    ) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};
