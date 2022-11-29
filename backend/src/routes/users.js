const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");


// This section will help you get a list of all the documents.
router.route("/api/users").get(async function (req, res) {
  const db = dbo.getDb();
  
    db
      .collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
});

router.route("/api/createtheUser").post(function (req, res) {
  const matchDocument = {
    email: req.body.email,
    password: req.body.password,
  };
  const db = dbo.getDb();
  db
    .collection("users")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting user!");
      }
      else
      {
        console.log(`Added a new user:  ${result.email}`);
        res.status (204).send();
      }
    });
});

module.exports = router;