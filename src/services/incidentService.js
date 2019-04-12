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
