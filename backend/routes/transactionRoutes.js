const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware');

// GET /transactions/recent
router.get("/recent", protect, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 }).limit(10);
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 }).limit(10);

    const combined = [
      ...incomes.map(item => ({ ...item._doc, type: "income" })),
      ...expenses.map(item => ({ ...item._doc, type: "expense" }))
    ];

    combined.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(combined);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recent transactions" });
  }
});

module.exports = router;
