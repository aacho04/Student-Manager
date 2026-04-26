const Grade = require("../models/Grade");
const Student = require("../models/Student");
const { getPerformanceClassification } = require("../services/javaAnalyticsService");

const addGrade = async (req, res, next) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const getGradesByStudent = async (req, res, next) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
    const average =
      grades.length > 0 ? grades.reduce((sum, g) => sum + g.marks, 0) / grades.length : 0;

    const classification = await getPerformanceClassification(average);

    res.json({ grades, average, classification });
  } catch (error) {
    next(error);
  }
};

const getGradeOverview = async (_req, res, next) => {
  try {
    const students = await Student.find();
    const overview = await Promise.all(
      students.map(async (student) => {
        const grades = await Grade.find({ studentId: student._id });
        const average =
          grades.length > 0 ? grades.reduce((sum, g) => sum + g.marks, 0) / grades.length : 0;
        const classification = await getPerformanceClassification(average);
        return {
          studentId: student._id,
          studentName: student.name,
          course: student.course,
          average,
          classification
        };
      })
    );
    res.json(overview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addGrade,
  getGradesByStudent,
  getGradeOverview
};
