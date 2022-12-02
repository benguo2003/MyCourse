import axios from "axios";
import {BASE_URL} from "../util/constants";

export const createUser = async (
    email,
    password,
    studentID,
    userName,
  ) => {
    return await axios
      .post(`${BASE_URL}/api/createtheUser`, {
        email: email,
        password: password,
        studentID: studentID,
        userName: userName
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
