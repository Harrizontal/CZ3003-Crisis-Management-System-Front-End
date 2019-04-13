import axios from "axios";

import { incidentData } from "../components/map/map-style";

export const incidentService = {
  getIncidents,
  getIncident,
  deleteIncident,
  updateIncident,
  addIncident
};

function getIncidents() {
  return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(console.log("asd"))
    .then(user => {
      return incidentData;
    });
}

function getIncident(id) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
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
