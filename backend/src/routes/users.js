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

router.route("/api/getCurUser").get(async function (req, res) {
  const userQuery = {
    email: email
  }
  const db = dbo.getDb();
  db
    .collection("curUser")
    .find({"email": userQuery.email})
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
    userID: req.body.userID
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

router.route("/api/createCurUser").post(function (req, res) {
  const matchDocument = {
    email: req.body.email
  };
  const db = dbo.getDb();
  db
    .collection("curUser")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting user!");
      }
      else
      {
        console.log(`Added a new curUser:  ${result.email}`);
        res.status (204).send();
      }
    });
});

router.route("/api/deleteCurUser").delete((req, res) => {
  const db = dbo.getDb();
  db
    .collection("curUser")
    .deleteMany({}, function(err, __result) {
      if(err)
      {
        res.status(400).send(`Error deleting course with id ${courseQuery.email}!`);
      }
      else
      {
        console.log("1 document deleted!");
      }
    });
});

module.exports = router;