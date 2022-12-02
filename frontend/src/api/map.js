import axios from "axios";
import {BASE_URL} from "../util/constants";


export const getBuilding = async (
    classSectionBuildingCode
  ) => {
    return await axios
    .get(`${BASE_URL}/api/getBuilding/:classSectionBuildingCode`, {
            classSectionBuildingCode: classSectionBuildingCode
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
  };