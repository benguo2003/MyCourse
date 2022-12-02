import axios from "axios";
import {BASE_URL} from "../util/constants";

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
    gridVal,
    buildingDisp,
    userEmail,
    classCapacityLeft,
    userRating,
    courseAvergeRating
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
        gridVal: gridVal,
        buildingDisp: buildingDisp,
        userEmail: userEmail,
        classCapacityLeft: classCapacityLeft,
        userRating: userRating,
        courseAvergeRating: courseAvergeRating
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

export const deleteCourse = async (
  classSecID
) => {
  return await axios
    .delete(`${BASE_URL}/api/deleteCourse`, {
      data: { classSecID: classSecID }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export const updateCourse = async (
  classSecID,
  userEmail,
  userRating
  
) => {
  return await axios
    .post(`${BASE_URL}/api/courseUpdate`, {
        classSecID: classSecID,
        userEmail: userEmail,
        userRating: userRating
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export const updateAverage = async (
  selectedSubject,
  selectedCourse,
  courseAverageRating
) => {
  return await axios
    .post(`${BASE_URL}/api/updateAverage`, {
      selectedSubject: selectedSubject,
      selectedCourse: selectedCourse,
      courseAverageRating: courseAverageRating
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

