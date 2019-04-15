import { Config } from "../Config";
import axios from "axios";
const url = Config.SERVER_URL;

export const incidentService = {
  getIncidents,
  getIncident,
  updateIncident,
  addIncident
};

function getIncidents() {
  return axios
    .get(url + "/allIncidents?status=pending&status=ongoing&order=desc")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}

function getIncident(id) {
  return axios
    .get(url + "/incident/" + id)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}

function updateIncident(id, incident) {
  console.log(incident);
  var configHeader = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1)
    }
  };
  return axios
    .patch(url + "/incident/" + id, incident, configHeader)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}

function addIncident(incident) {
  var configHeader = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1)
    }
  };
  return axios
    .post(url + "/incident", incident, configHeader)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}
