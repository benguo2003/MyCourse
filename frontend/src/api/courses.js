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
    selectedCourse,
    selectedSubject,
    selectedSection,
    classSecID,
    gradeType,
    classUnits,
    meetingDaysofWeek,
    meetingStartTime,
    meetingStopTime,
    building,
    buildingRoomCode,  
  ) => {
    return await axios
      .post(`${BASE_URL}/api/createCourse`, {
        selectedCourse: selectedCourse,
        selectedSubject: selectedSubject,
        selectedSection: selectedSection,
        classSecID: classSecID,
        gradeType: gradeType,
        classUnits: classUnits,
        meetingDaysofWeek: meetingDaysofWeek,
        meetingStartTime: meetingStartTime,
        meetingStopTime: meetingStopTime,
        building: building,
        buildingRoomCode: buildingRoomCode,
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