const database = require("./database.js");

const courses = {
    async getAllCourses() {
        const dbo = await database.getDbo();
        console.log(dbo.collection("courses").find().toArray());
        return await dbo.collection("courses").find().toArray();
    },

    async createCourse(course) {
        const dbo = await database.getDbo();
        return await dbo.collection("courses").insertOne(course);
    }
}

module.export = courses;