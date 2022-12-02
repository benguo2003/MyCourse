const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");

router.route("/api/courses").get(async function (req, res) {
  const db = dbo.getDb();
    db
      .collection("courses")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
});

router.route("/api/createCourse").post(function (req, res) {
  const matchDocument = {
    selectedCourse: req.body.selectedCourse,
    selectedSubject: req.body.selectedSubject,
    selectedSection: req.body.selectedSection,
    classSecID: req.body.classSecID,
    gradeType: req.body.gradeType,
    classUnits: req.body.classUnits,
    meetingDaysofWeek: req.body.meetingDaysofWeek,
    meetingStartTime: req.body.meetingStartTime,
    meetingStopTime: req.body.meetingStopTime,
    building: req.body.building,
    buildingRoomCode: req.body.buildingRoomCode,
    gridVal: req.body.gridVal,
    buildingDisp: req.body.buildingDisp,
    userEmail: req.body.userEmail,

  };
  const db = dbo.getDb();
  db
    .collection("courses")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      }
      else
      {
        console.log(`Added a new match`);
        res.status (204).send();
      }
    });
});

router.route("/api/deleteCourse").delete((req, res) => {
  const courseQuery = { classSecID: req.body.classSecID };
  const db = dbo.getDb();
  db
    .collection("courses")
    .deleteOne(courseQuery, function(err, __result) {
      if(err)
      {
        res.status(400).send(`Error deleting course with id ${courseQuery.classID}!`);
      }
      else
      {
        console.log("1 document deleted!");
      }
    });
});

module.exports = router;