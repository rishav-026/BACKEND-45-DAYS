const Course = require("../models/course");

const createCourse = async (req, res) => {
  try {
    const course = await new Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({message:err.message});
  }
};
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};

module.exports ={
    createCourse,
    getCourses,
}