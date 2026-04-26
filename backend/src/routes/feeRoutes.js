const express = require("express");
const { createFee, getFees, updateFeeStatus } = require("../controllers/feeController");

const router = express.Router();

router.get("/", getFees);
router.post("/", createFee);
router.patch("/:id/status", updateFeeStatus);

module.exports = router;
