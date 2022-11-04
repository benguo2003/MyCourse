const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 1000;
app.use(cors());
app.use(express.json());
app.use(require("./src/routes/courses"));
// get driver connection
const dbo = require("./src/models/database");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});