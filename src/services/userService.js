import { Config } from "../Config";
import axios from "axios";
const url = Config.SERVER_URL;

export const userService = {
  login,
  logout
};

function login(username, password) {
  return axios
    .post(url + "/session", {
      userIC: username,
      password: password
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

function logout() {
  console.log("Remove user from local storage");
  localStorage.removeItem("token");
}
