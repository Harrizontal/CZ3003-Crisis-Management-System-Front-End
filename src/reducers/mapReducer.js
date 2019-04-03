import Immutable from "immutable";
import { buildingData } from "../fakedata/buildingData";
import {
  dengueData,
  dengueLayerPaint,
  weatherData,
  weatherLayerPaint
} from "../components/map/map-style";

import { fromJS } from "immutable";
import data from "../components/map/dengue-clusters-geojson.geojson";

export default function mapReducer(styleState = null, action) {
  console.log("mapReducer accessed");
  //   if (styleState === null && action.type !== "SET_STYLE") return styleState;
  switch (action.type) {
    case "SET_STYLE": {
      console.log(action.payload);
      return Immutable.fromJS(action.payload);
    }

    case "CHANGE_VIZ": {
      console.log("CHANGE_VIZ");
      let data;
      let paint;
      switch (action.payload) {
        case "dengue":
          data = action.geoJsonData;
          paint = dengueLayerPaint;
          break;
        case "weather":
          data = weatherData;
          paint = weatherLayerPaint;
          break;
        case "psi":
          break;
        default:
      }
      styleState = [data, paint];
      return styleState;
    }

    default:
      return [];
  }
}
