const express = require("express");
<<<<<<< HEAD
const recordRoutes = express.Router();
const dbo = require("../db/conn");

// This section will help you get a list of all the documents.
recordRoutes.route("/api/courses").get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("courses")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
});

module.exports = recordRoutes;
=======
const router = express.Router()
const course = require("../controllers/courses");

router.route("/api/courses").get(async function (req, res) {
    course.getAllCourses;
});
router.post("/api/createCourses", course.createCourse);
>>>>>>> bee8dea (test changes)
