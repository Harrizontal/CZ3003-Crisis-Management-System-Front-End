//let user = JSON.parse(localStorage.getItem("user"));
//const initialState = user ? { loggedIn: true, user } : {};

import {
  dengueLayerPaint,
  fillLayerFormat,
  weatherLayerPaint
} from "../components/map/map-style";

const initialState = {
  // give info to sidebar and react map
  selected: "",
  mapSourceData: "",
  mapLayer: "",
  type: "",
  information: ""
};

export function overviewReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_OVERVIEW":
      console.log("CHANGE_OVERVIEW");

      let selected, data, layer, type, info;
      var sourceData = {
        type: "FeatureCollection",
        features: action.payload["features"]
      };

      switch (action.selected) {
        case "dengue":
          data = sourceData;
          fillLayerFormat.paint = dengueLayerPaint;
          layer = fillLayerFormat;
          type = "fill";
          break;
        case "weather":
          data = sourceData;
          info = action.payload["information"];
          fillLayerFormat.paint = weatherLayerPaint;
          type = "marker";
          break;
        case "psi":
          data = sourceData;
          fillLayerFormat.paint = weatherLayerPaint;
          type = "psimarker";
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
        information: info
      };
    default:
      return state;
  }
}
