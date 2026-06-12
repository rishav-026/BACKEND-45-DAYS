const express = require('express');
const connectDB = require('./config/db');

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

app.use(express.json());

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Student Course API");
});

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});