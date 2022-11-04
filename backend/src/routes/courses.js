const express = require("express");
const router = express.Router();

const course = require("../controllers/courses");

router.get("/api/courses", course.getAllCourses);
router.post("/api/createCourses", course.createCourse);