const Attendance = require("../models/Attendance");

const markAttendance = async (req, res, next) => {
  try {
    const { studentId, date, status } = req.body;
    const entry = await Attendance.findOneAndUpdate(
      { studentId, date: new Date(date) },
      { status },
      { upsert: true, new: true, runValidators: true }
    );
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
};

const getAttendanceByStudent = async (req, res, next) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  getAttendanceByStudent
};
