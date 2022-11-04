const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb+srv://MyCourse:webcreate@cluster0.65igpn4.mongodb.net/?retryWrites=true&w=majority');

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("myCourseDB");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};