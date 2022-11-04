const {ATLAS_URI} = process.env;

const {MongoClient} = require("mongodb");

let conn = new MongoClient(ATLAS_URI, {useUnifiedTopology: true});

module.exports = {
    async getDbo() {
        if (conn.isConnected()) await conn.connect();
        return conn.db("myCourseDB");
    },
};