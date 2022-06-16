const mongoose = require("mongoose");

// TEACHER SCHEMA

const teacherSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  role: String,
  classes: Array,
});

const Teacher = new mongoose.model("Teacher", teacherSchema);

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  role: String,
  classes: Array,
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = { Teacher, Student };
