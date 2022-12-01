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