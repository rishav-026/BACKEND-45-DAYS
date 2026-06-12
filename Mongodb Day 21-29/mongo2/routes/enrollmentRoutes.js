const express = require("express");

const router = express.Router();

const {
    createEnrollment,
    getEnrollments,
} = require("../controllers/enrollmentController")


router.post("/",createEnrollment);

router.get("/",getEnrollments);

module.exports = router;