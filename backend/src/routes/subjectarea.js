const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");


// This section will help you get a list of all the documents.
router.route("/api/subjarea").get(async function (req, res) {
  const db = dbo.getDb();
  
    db
      .collection("SubjectArea")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
});

module.exports = router;