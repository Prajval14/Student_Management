const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find().populate("courses");
  res.send(students);
});

// Add new student
router.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// Update student
router.put("/update/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.send(student);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Failed to update student", error });
  }
});

// Delete student
router.delete("/delete/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send({ message: `Student ${student.firstName} ${student.lastName} deleted` });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send({ message: "Failed to delete student" });
  }
});

module.exports = router;
