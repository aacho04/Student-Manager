const Student = require("../models/Student");
const Grade = require("../models/Grade");
const Attendance = require("../models/Attendance");
const { getAnalyticsSummary } = require("../services/javaAnalyticsService");

const getDashboardReport = async (_req, res, next) => {
  try {
    const students = await Student.find();
    const studentReports = await Promise.all(
      students.map(async (student) => {
        const grades = await Grade.find({ studentId: student._id });
        const attendance = await Attendance.find({ studentId: student._id });

        const average =
          grades.length > 0 ? grades.reduce((sum, g) => sum + g.marks, 0) / grades.length : 0;

        const presentCount = attendance.filter((a) => a.status === "Present").length;
        const attendancePercentage =
          attendance.length > 0 ? (presentCount / attendance.length) * 100 : 0;

        return {
          studentId: String(student._id),
          name: student.name,
          average,
          attendancePercentage
        };
      })
    );

    const analytics = await getAnalyticsSummary(studentReports);
    res.json(analytics);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardReport
};
