import axios from "axios";

export const incidentService = {
  getIncidents,
  getIncident,
  deleteIncident,
  updateIncident,
  addIncident
};

function getIncidents() {
  // return fetch(`https://jsonplaceholder.typicode.com/posts`)
  //   .then(console.log("asd"))
  //   .then(user => {
  //     return [user];
  //   });
  return axios
    .get("https://reqres.in/api/incidents")
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

function getIncident() {
  return {};
}

function deleteIncident() {
  return {};
}

function updateIncident() {
  return {};
}

function addIncident() {
  return {};
}
