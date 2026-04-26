const Fee = require("../models/Fee");

const createFee = async (req, res, next) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (error) {
    next(error);
  }
};

const getFees = async (_req, res, next) => {
  try {
    const fees = await Fee.find().populate("studentId", "name course").sort({ dueDate: 1 });
    res.json(fees);
  } catch (error) {
    next(error);
  }
};

const updateFeeStatus = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { paid: req.body.paid },
      { new: true, runValidators: true }
    );
    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }
    res.json(fee);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFee,
  getFees,
  updateFeeStatus
};
