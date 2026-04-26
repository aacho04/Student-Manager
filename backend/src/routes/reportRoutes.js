const express = require("express");
const { getDashboardReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/dashboard", getDashboardReport);

module.exports = router;
