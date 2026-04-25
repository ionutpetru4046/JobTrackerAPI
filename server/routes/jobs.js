const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/jobs
router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// GET /api/jobs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status, search, sort = "-createdAt", page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [items, total] = await Promise.all([
      Job.find(query)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Job.countDocuments(query),
    ]);

    res.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /api/jobs/stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.user.id);
    console.log("User _id:", req.user._id);
    
    const statuses = ["applied", "interview", "offer", "rejected"];

    const counts = await Job.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    console.log("Counts from DB:", counts);

    const totals = statuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    counts.forEach((c) => {
      totals[c._id] = c.count;
    });

    console.log("Final totals:", totals);
    res.json({ totals });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET /api/jobs/:id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// PUT /api/jobs/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

module.exports = router;