const mongoose = require("mongoose");

// TEACHER SCHEMA

const teacherSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true, lowercase: true },
  lName: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, default: "Mentor" },
  classes: { type: Array, required: true, default: [] },
  subscribed: { type: Boolean, default: false },
});

const Teacher = new mongoose.model("Teacher", teacherSchema);

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true, lowercase: true },
  lName: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, default: "Student" },
  classes: { type: Array, required: true, default: [] },
});

const Student = new mongoose.model("Student", studentSchema);

// CLASSES SCHEMA

const classSchema = new mongoose.Schema({
  className: { type: String, required: true, trim: true, lowercase: true },
  teacherId: { type: String, required: true, trim: true },
  secretKey: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  assignments: { type: Array, default: [] },
  whoTeach: Object,
  roster: { type: Array, default: [] },
  messages: { type: Array, default: [] },
});

const Class = new mongoose.mongoose.model("Class", classSchema);

module.exports = { Teacher, Student, Class };
