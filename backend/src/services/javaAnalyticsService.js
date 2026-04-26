const axios = require("axios");

const JAVA_SERVICE_URL = process.env.JAVA_SERVICE_URL || "http://localhost:8081";

const getPerformanceClassification = async (average) => {
  try {
    const { data } = await axios.post(`${JAVA_SERVICE_URL}/api/analytics/performance`, {
      average
    });
    return data.classification;
  } catch (_error) {
    if (average >= 90) return "Outstanding";
    if (average >= 75) return "Good";
    if (average >= 50) return "Average";
    return "Needs Improvement";
  }
};

const getAnalyticsSummary = async (students) => {
  try {
    const { data } = await axios.post(`${JAVA_SERVICE_URL}/api/analytics/summary`, {
      students
    });
    return data;
  } catch (_error) {
    const sorted = [...students].sort((a, b) => b.average - a.average);
    return {
      topStudents: sorted.slice(0, 3),
      overallAverage:
        students.length > 0
          ? students.reduce((sum, s) => sum + s.average, 0) / students.length
          : 0,
      overallAttendance:
        students.length > 0
          ? students.reduce((sum, s) => sum + s.attendancePercentage, 0) / students.length
          : 0
    };
  }
};

module.exports = {
  getPerformanceClassification,
  getAnalyticsSummary
};
