import { infoConstants as constants } from "../constants";

//let user = JSON.parse(localStorage.getItem("user"));
//const initialState = user ? { loggedIn: true, user } : {};

import {
  dengueData,
  dengueLayerPaint,
  fillLayerFormat,
  weatherData,
  weatherData2,
  weatherLayerPaint
} from "../components/map/map-style";

const initialState = {
  // give info to sidebar and react map
  selected: "",
  mapSourceData: "",
  mapLayer: "",
  type: "",
  moreInformation: ""
};

export function overviewReducer(state = initialState, action) {
  console.log("updating state for reactmap and sidebar");
  switch (action.type) {
    case "CHANGE_OVERVIEW":
      console.log("CHANGE_VIZ");
      let selected, data, layer, type, moreInfo;
      console.log(action.payload);
      switch (action.selected) {
        case "dengue":
          data = action.payload;
          fillLayerFormat.paint = dengueLayerPaint;
          layer = fillLayerFormat;
          type = "fill";
          break;
        case "weather":
          data = weatherData2;
          fillLayerFormat.paint = weatherLayerPaint;
          //layer = fillLayerFormat;
          //paint = weatherLayerPaint;
          type = "marker";
          break;
        case "psi":
          break;
        default:
      }
      selected = action.selected;
      return {
        ...state,
        selected: selected,
        mapSourceData: data,
        mapLayer: layer,
        type: type,
        moreInformation: "Testing!"
      };
    default:
      return state;
  }
}
