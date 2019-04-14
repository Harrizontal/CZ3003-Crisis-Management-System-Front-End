import { Config } from "../Config";
import axios from "axios";
import { incidentData } from "../components/map/map-style";
const url = Config.SERVER_URL;

export const incidentService = {
  getIncidents,
  getIncident,
  updateIncident,
  addIncident
};

function getIncidents() {
  return axios
    .get(url + "/allIncidents?status=All&order=desc")
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

function updateIncident() {
  return {};
}

function addIncident(incident) {
  console.log(incident);
  var incident2 = {
    name: "Harrison",
    userIC: "S9423145J",
    mobilePhone: "81234766",
    address: "1G Cantonment Road",
    description: "Harrison is testing",
    assistance_type: [1, 2],
    emergency_type: [1, 2],
    relevant_agencies: [1, 2]
  };
  console.log(incident2);
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
