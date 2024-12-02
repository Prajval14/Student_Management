const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Add new course
router.post("/add", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.send(course);
});

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

module.exports = router;
