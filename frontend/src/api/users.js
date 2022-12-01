import axios from "axios";
import {BASE_URL} from "../util/constants";

export const createUser = async (
    email,
    password,
    userID
  ) => {
    return await axios
      .post(`${BASE_URL}/api/createtheUser`, {
        email: email,
        password: password,
        userID: userID
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

export const createCurUser = async (
  email
) => {
  return await axios
    .post(`${BASE_URL}/api/createCurUser`, {
      email: email,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteCurUser = async (
) => {
  return await axios
    .delete(`${BASE_URL}/api/deleteCurUser`, {})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}