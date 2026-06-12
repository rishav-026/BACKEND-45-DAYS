const Enrollment = require("../models/Enrollment");


const createEnrollment =async(req,res)=>{
  try{
    const enrollment = await new Enrollment.create(req.body);
    res.status(201).json(enrollment);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
};
const getEnrollments =async(req,res)=>{
  try{
    const enrollments = await Enrollment.find({}).populate("studentId").populate("courseId");
    res.status(200).json(enrollments);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
};

module.exports = {
    createEnrollment,
    getEnrollments,
}