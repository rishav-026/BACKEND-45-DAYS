const express = require("express");

const router = express.Router();


const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents,
    filterStudents,
} = require("../controllers/studentController");

router.post("/",createStudent);

router.get("/",getStudents);

router.get("/:id",getStudentById);

router.patch("/:id",updateStudent);

router.delete("/:id",deleteStudent);

router.get("/search/name",searchStudents);

router.get("/filter/department",filterStudents);

module.exports = router;