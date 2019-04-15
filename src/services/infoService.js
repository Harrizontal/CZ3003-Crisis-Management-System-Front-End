import axios from "axios";
import { Config } from "../Config";
const url = Config.SERVER_URL;
export const infoService = {
  getDengueClusterMap,
  getWeatherInfo,
  getPSIInfo
};

async function getDengueClusterMap() {
  return axios
    .get(url + "/dengue")
    .then(response => response.data)
    .catch(error => console.log(error.response));
}

function getWeatherInfo() {
  return axios
    .get(url + "/weather")
    .then(response => response.data)
    .catch(error => console.log(error.response));
}

function getPSIInfo() {
  return axios
    .get(url + "/psi")
    .then(response => response.data)
    .catch(error => console.log(error.response));
}
