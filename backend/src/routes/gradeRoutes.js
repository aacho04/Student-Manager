const express = require("express");
const {
  addGrade,
  getGradesByStudent,
  getGradeOverview
} = require("../controllers/gradeController");

const router = express.Router();

router.post("/", addGrade);
router.get("/overview", getGradeOverview);
router.get("/:studentId", getGradesByStudent);

module.exports = router;
