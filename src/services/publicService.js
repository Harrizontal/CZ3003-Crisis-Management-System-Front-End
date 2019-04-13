import axios from "axios";
export const publicService = {
  createIncident,
  subscribe
};

function createIncident(incident) {
  console.log("createIncident");
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
