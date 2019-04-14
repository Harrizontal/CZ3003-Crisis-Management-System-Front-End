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
      case "psi":
        res = await infoService.getPSIInfo();
        break;
      default:
        return null;
    }
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
