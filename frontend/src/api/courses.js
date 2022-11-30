import axios from "axios";
import {BASE_URL} from "../util/constants";

/*export const getAllCourses = async () => {
    return await axios
    .get(`${BASE_URL}/api/courses`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err.message);
    });
};*/

export const getAllCourses = fetch(`${BASE_URL}/api/courses`);

getAllCourses
  .then((response) => {
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });

export const createCourse = async (
    classID,
    teacher,
    daysOfWeek,
    className,
    meetingStartTime,
    meetingStopTime   
  ) => {
    return await axios
      .post(`${BASE_URL}/api/createCourse`, {
        classID: classID,
        teacher: teacher,
        daysOfWeek: daysOfWeek,
        className: className,
        meetingStartTime: meetingStartTime,
        meetingStopTime: meetingStopTime, 
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

export const deleteCourse = async () => {
  return await axios
    .delete(`${BASE_URL}/api/deleteCourse`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}