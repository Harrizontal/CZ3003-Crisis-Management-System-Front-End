import { userConstants } from "../constants";
import axios from "axios";
import { userService } from "../services";
import { history } from "../helpers";
import { resolve } from "path";
import { rejects } from "assert";

export const login = (username, password) => dispatch => {
  //const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  // new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
  console.log("Loading - execute login at userActions");
  dispatch(request({ username }));
  return userService.login(username, password).then(
    user => {
      console.log("Login successful");
      console.log(user);
      dispatch(success(user));
      return user;
    },
    error => {
      console.log("Login failed: error:");
      console.log(error);
      dispatch(failure(error));
      return error;
    }
  );
  // });

  // dispatch({
  //   type: LOGIN,
  //   payload: "test1"
  // });

  // for loading bar
  function request(user) {
    console.log("execute request at login");
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  // login sucess
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  // loging fail
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};
export const logout = id => async dispatch => {
  // const res = await axios.get(
  //   `https://jsonplaceholder.typicode.com/users/${id}`
  // );
  // dispatch({
  //   type: LOGOUT,
  //   payload: "test"
  // });
};
