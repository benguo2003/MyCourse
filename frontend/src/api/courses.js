import axios from "axios";
import {BASE_URL} from "../util/constants";

export const getAllCourses = async () => {
    return await axios
    .get(`${BASE_URL}/api/courses`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err.message);
    });
};

export const createCourse = async (
    teacher,
    courseID,
    courseName,
    days,
    times    
  ) => {
    return await axios
      .post(`${BASE_URL}/api/createCourses`, {
        teacher: teacher,
        courseID: courseID,
        courseName: courseName,
        days: days,
        times: times 
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
