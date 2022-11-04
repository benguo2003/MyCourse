const express = require("express");
const router = express.Router()
const course = require("../controllers/courses");

router.route("/api/courses").get(async function (req, res) {
    course.getAllCourses;
});
router.post("/api/createCourses", course.createCourse);