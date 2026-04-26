const express = require("express");
const {
  markAttendance,
  getAttendanceByStudent
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", markAttendance);
router.get("/:studentId", getAttendanceByStudent);

module.exports = router;
