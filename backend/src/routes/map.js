const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");

router.route("/api/getBuilding/:classSectionBuildingCode").get(async function (req, res) {
    const userQuery = {
        classSectionBuildingCode: req.params.classSectionBuildingCode
    };

    const db = dbo.getDb();
    db
      .collection("MapData")
      .findOne({classSectionBuildingCode: userQuery.classSectionBuildingCode}, function(err, __result) {
        if(err)
        {
          res.status(400).send(`Error!`);
        }
        else
        {
          res.json(__result);
        }
      });
  });

module.exports = router;