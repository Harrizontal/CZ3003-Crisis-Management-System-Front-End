import { json as requestJson } from "d3-request";
import axios from "axios";
export const infoService = {
  getDengueClusterMap,
  getWeatherInfo
};

async function getDengueClusterMap() {
  console.log("InfoService getDengueClusterMap");
  // var myObject = JSON.parse(
  //   require("../components/map/dengue-clusters-geojson.json")
  // );
  // return { hello: "message" };
  let promise = new Promise((resolve, reject) => {
    requestJson(
      require("../components/map/dengue-clusters-geojson.geojson"),
      (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject("error");
          console.log("Error loading map");
        }
      }
    );
  });

  let result = await promise;

  // result as an object!
  console.log("Returning result");
  //return result;
  return require("../components/map/dengue-clusters-geojson.json");
}

function getWeatherInfo() {
  console.log("InfoService getWeatherInformation");

  return axios
    .get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
    .then(function(response) {
      // handle success
      return response.data;
    })
    .catch(function(error) {
      // handle error
      return error;
    });
}
