import { infoService } from "../services";

export function clickMap(feature) {
  return {
    type: "CLICK_MAP",
    payload: feature
  };
}

export function setStyle(style) {
  return {
    type: "SET_STYLE",
    payload: style
  };
}

export const changeOverview = event => async dispatch => {
  console.log("changeOverview @ mapActions");
  // might need 3 dispatchs to weather,api , dengue
  // dispatch({
  //   type: "CHANGE_VIZ",
  //   payload: event.target.value
  // });
  let value = event.target.value;
  let res;
  try {
    console.log("action @ getMapData");
    switch (value) {
      case "dengue":
        res = await infoService.getDengueClusterMap();
        break;
      case "weather":
        res = await infoService.getWeatherInfo();
        break;
      // need format res here...
      default:
        return null;
    }

    console.log("res done");
    console.log(res);

    // change map
    dispatch({
      type: "CHANGE_OVERVIEW",
      selected: value,
      payload: res
    });

    // change information
  } catch (error) {
    console.log("GetMapData - " + error);
  }
};

// export function changeViz(event) {
//   console.log("changeViz triggered");

//   // fetch geojson api here, and its data

//   return {
//     type: "CHANGE_VIZ",
//     payload: event.target.value
//   };
// }
