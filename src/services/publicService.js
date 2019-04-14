import { Config } from "../Config";
import axios from "axios";
const url = Config.SERVER_URL;

export const publicService = {
  createIncident,
  subscribe
};

function createIncident(incident) {
  return axios
    .post(url + "/gpincident", incident)
    .then(response => response.data)
    .catch(error => console.log(error.response));
}

function subscribe(phoneNoPostalCode) {
  console.log("subscribe");
  return axios
    .post(`https://jsonplaceholder.typicode.com/posts/`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}
