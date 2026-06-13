//This is the Complete Code for Student Course Management API using MongoDB and Express.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = 8000;

// ======================
// MongoDB Connection
// ======================

mongoose
  .connect("mongodb://127.0.0.1:27017/student-course-db")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ======================
// STUDENT SCHEMA
// ======================

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model(
  "Student",
  studentSchema
);

// ======================
// COURSE SCHEMA
// ======================

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model(
  "Course",
  courseSchema
);

// ======================
// ENROLLMENT SCHEMA
// ======================

const enrollmentSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Student",

        required: true,
      },

      courseId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Course",

        required: true,
      },

      enrolledAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

// ======================
// HOME ROUTE
// ======================

app.get("/", (req, res) => {
  res.send(
    "Student Course Management API"
  );
});

// ===================================
// STUDENT CRUD
// ===================================

// CREATE STUDENT

app.post(
  "/students",
  async (req, res) => {
    try {
      const student =
        await Student.create(
          req.body
        );

      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

// GET ALL STUDENTS

app.get(
  "/students",
  async (req, res) => {
    try {
      const students =
        await Student.find({});

      res.json(students);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// GET ONE STUDENT

app.get(
  "/students/:id",
  async (req, res) => {
    try {
      const student =
        await Student.findById(
          req.params.id
        );

      if (!student) {
        return res.status(404).json({
          message:
            "Student not found",
        });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// UPDATE STUDENT

app.patch(
  "/students/:id",
  async (req, res) => {
    try {
      const student =
        await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      res.json(student);
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

// DELETE STUDENT

app.delete(
  "/students/:id",
  async (req, res) => {
    try {
      await Student.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Student Deleted",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ===================================
// COURSE CRUD
// ===================================

// CREATE COURSE

app.post(
  "/courses",
  async (req, res) => {
    try {
      const course =
        await Course.create(
          req.body
        );

      res.status(201).json(course);
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

// GET ALL COURSES

app.get(
  "/courses",
  async (req, res) => {
    try {
      const courses =
        await Course.find({});

      res.json(courses);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ===================================
// ENROLL STUDENT
// ===================================

app.post(
  "/enrollments",
  async (req, res) => {
    try {
      const enrollment =
        await Enrollment.create(
          req.body
        );

      res.status(201).json(
        enrollment
      );
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

// ===================================
// GET ALL ENROLLMENTS
// ===================================

app.get(
  "/enrollments",
  async (req, res) => {
    try {
      const enrollments =
        await Enrollment.find({})
          .populate("studentId")
          .populate("courseId");

      res.json(enrollments);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ===================================
// SEARCH STUDENTS
// ===================================

app.get(
  "/search/students",
  async (req, res) => {
    try {
      const name =
        req.query.name;

      const students =
        await Student.find({
          name: {
            $regex: name,
            $options: "i",
          },
        });

      res.json(students);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ===================================
// FILTER STUDENTS
// ===================================

app.get(
  "/filter/students",
  async (req, res) => {
    try {
      const department =
        req.query.department;

      const students =
        await Student.find({
          department,
        });

      res.json(students);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ======================
// SERVER
// ======================

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});