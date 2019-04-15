import { json as requestJson } from "d3-request";
import axios from "axios";
import { Config } from "../Config";
const url = Config.SERVER_URL;
export const infoService = {
  getDengueClusterMap,
  getWeatherInfo,
  getPSIInfo
};

async function getDengueClusterMap() {
  console.log("InfoService getDengueClusterMap");
  return axios
    .get(url + "/dengue")
    .then(response => response.data)
    .catch(error => console.log(error.response));
  // // var myObject = JSON.parse(
  // //   require("../components/map/dengue-clusters-geojson.json")
  // // );
  // // return { hello: "message" };
  // let promise = new Promise((resolve, reject) => {
  //   requestJson(
  //     require("../components/map/dengue-clusters-geojson.geojson"),
  //     (error, response) => {
  //       if (!error) {
  //         resolve(response);
  //       } else {
  //         reject("error");
  //         console.log("Error loading map");
  //       }
  //     }
  //   );
  // });

  // let result = await promise;

  // // result as an object!
  // console.log("Returning result");
  // //return result;
  // return require("../components/map/dengue-clusters-geojson.json");
}

function getWeatherInfo() {
  console.log("InfoService getWeatherInformation");

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
