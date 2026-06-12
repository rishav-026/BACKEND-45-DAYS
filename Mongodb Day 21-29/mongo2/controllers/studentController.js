const Student = require("../models/students");


const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get All students
const getStudents=async(req,res)=>{
  try{
    const  students = await Student.find({});
    res.status(200).json(students);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
};
const getStudentById=async(req,res)=>{
  try{
    const student = await Student.findById(req.params.id);
    if(!student){
      return res.status(404).json({message:"Studet not found"});
    }
    res.status(200).json(student);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
};

const updateStudent=async(req,res)=>{
  try{
    const student = await Student.findByIdAndUpdate(req.params.id,req.body ,{new:true , runValidators:true},)
    if(!student){
      return res.status(404).json({message:"Student not found"});
    }
    res.status(200).json(student);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
};

const deleteStudent=async(req,res)=>{
  try{
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Student deleted successfully"});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
}

const searchStudents=async(req,res)=>{
  try{
    const name = req.query.name;
    const students = await Student.find({name:{$regex:name,$options:"i"}});
    res.status(200).json(students);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
};
//Filter Students
const filterStudents= async(req,res)=>{
  try{
    const department = req.query.department;
    const students = await Student.find({department,});
    res.json(students);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
};


module.exports ={
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents,
    filterStudents,
}