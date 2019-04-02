import { json as requestJson } from "d3-request";
export const infoService = {
  getDengueClusterMap
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
  return result;
}
