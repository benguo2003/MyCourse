const status = require("http-status")

const courseModel = require("../models/courses.js");

const has = require("has-keys");
//const {}

module.exports = {
    async getAllCourses(req, res) {
        let data = await courseModel.getAllCourses();
        res.json({status: true, message: "Returning Courses", data});
    },

    async createCourse(req, res) {
        let {
            teacher,
            courseID,
            courseName,
            days,
            times
        } = req.body;

        await courseModel.createCourse({
            teacher,
            courseID,
            courseName,
            days,
            times,
        });

        res.json({status: true, message: "Course Created"});
    },
};