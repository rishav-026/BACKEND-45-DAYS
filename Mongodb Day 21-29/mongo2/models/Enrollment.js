const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student",
    required:true,
  },
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true,
  },
  enrollmentAt:{
    type:Date,
    default:Date.now,
  },
},
{
  timestamps:true,
}
);
module.exports= mongoose.model("Enrollment",enrollmentSchema);