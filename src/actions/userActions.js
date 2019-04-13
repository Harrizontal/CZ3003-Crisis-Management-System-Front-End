import { userConstants } from "../constants";
import { userService } from "../services";

export const login = (username, password) => dispatch => {
  //const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  // new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
  console.log("Loading - execute login at userActions");
  dispatch(request({ username }));
  return userService.login(username, password).then(
    data => {
      console.log(data["msg"]);
      if (!data["msg"]) {
        dispatch(success(data));
        localStorage.setItem("token", JSON.stringify(data["token"]));
        return true;
      } else {
        return Promise.reject(false);
      }
    },
    error => {
      dispatch(failure(error));
      return Promise.reject(error);
    }
  );
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
