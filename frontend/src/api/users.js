import axios from "axios";
import {BASE_URL} from "../util/constants";
/*
export const getAllUsers = fetch(`${BASE_URL}/api/users`);

getAllUsers
  .then((response) => {
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error(`Could not get users: ${error}`);
  });*/

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

export const getCurrUser = async (
  userID
) => {
  return await axios
  .get(`${BASE_URL}/api/getUser`, {
    userID: userID
  })
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err.message);
  });
};