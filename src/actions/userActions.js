import { LOGIN, LOGOUT } from "./types";
import axios from "axios";

export const login = () => async dispatch => {
  //const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  dispatch({
    type: LOGIN,
    payload: res.data
  });
};
export const getContact = id => async dispatch => {
  // const res = await axios.get(
  //   `https://jsonplaceholder.typicode.com/users/${id}`
  // );
  dispatch({
    type: LOGOUT,
    payload: res.data
  });
};
