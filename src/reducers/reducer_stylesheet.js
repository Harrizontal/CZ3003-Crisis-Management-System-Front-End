import Immutable from "immutable";
import { buildingData } from "../fakedata/buildingData";
import {
  defaultMapStyle,
  dataLayer,
  dataLayer2,
  dataLayer2Paint,
  dataLayer2Source,
  dengueLayer,
  dengueLayerPaint,
  dengueLayerSource
} from "../components/map/map-style";
import { fromJS } from "immutable";
import data from "../components/map/dengue-clusters-geojson.geojson";
export default function StylesheetReducer(styleState = null, action) {
  if (styleState === null && action.type !== "SET_STYLE") return styleState;
  switch (action.type) {
    case "SET_STYLE": {
      return Immutable.fromJS(action.payload);
    }

    case "CHANGE_VIZ": {
      // const mapStyle = defaultMapStyle
      //   // Add geojson source to map
      //   .setIn(["sources", "incomeByState"], fromJS({ type: "geojson", data }))
      //   // Add point layer to map
      //   .set("layers", defaultMapStyle.get("layers").push(dataLayer));

      const LAYER_ID = "buildings";
      const {
        minAge,
        maxAge,
        minUnits,
        maxUnits,
        minSqft,
        maxSqft
      } = buildingData;
      const { categoryStops, lightBlue, darkBlue } = buildingData;
      let layerIdx = styleState
        .get("layers")
        .findIndex(layer => layer.get("id") === "data");
      let paint = {}; // <= not a constant, dont use elsewhere in this scope

      let layersToBePush;
      let paintToBePush;
      let sourceToBePush;
      let newStyle;
      switch (action.payload) {
        case "age":
          paint.property = "YEAR_BUILT";
          paint.type = "exponential";
          paint.stops = [[minAge, lightBlue], [maxAge, darkBlue]];

          layerIdx = styleState
            .get("layers")
            .findIndex(layer => layer.get("id") === "data2");

          layersToBePush = dengueLayer;
          paintToBePush = dengueLayerPaint;
          sourceToBePush = dengueLayerSource;

          break;
        case "sqft":
          paint.property = "BLDG_SQFT";
          paint.type = "exponential";
          paint.stops = [[minSqft, lightBlue], [maxSqft, darkBlue]];

          layerIdx = styleState
            .get("layers")
            .findIndex(layer => layer.get("id") === "data");

          //layerIdx = styleState.get("layers");

          layersToBePush = dataLayer2;
          paintToBePush = dataLayer2Paint;
          sourceToBePush = dataLayer2Source;

          // const newStyle = styleState.set(
          //   "layers",
          //   styleState.get("layers").push(dataLayer2)
          // );

          break;
        case "units":
          paint.property = "UNITS_RES";
          paint.type = "exponential";
          paint.stops = [[minUnits, lightBlue], [maxUnits, darkBlue]];
          break;
        case "use":
          paint.property = "BLDG_USE";
          paint.type = "categorical";
          paint.stops = categoryStops;
          break;
        default:
          paint = darkBlue;
      }

      // const newStyle = styleState.set(
      //   ["sources"],
      //   fromJS({ type: "geojson", data })
      // );

      // const newStyle = styleState.updateIn(
      //   ["layers", layerIdx, "paint"],
      //   property => {
      //     return property.set("fill-extrusion-color", paint);
      //   }
      // );
      //console.log(mapStyle);
      //console.log(newStyle);
      if (layerIdx == -1) {
        newStyle = styleState.set(
          "layers",
          styleState.get("layers").push(fromJS(layersToBePush))
        );
      } else {
        // newStyle = styleState.updateIn(["layers", layerIdx], layer => {
        //   return layer.set("source", fromJS(sourceToBePush));
        // });
        // console.log(sourceToBePush);
        // newStyle = styleState.deleteIn(["layers", layerIdx]);
        // console.log(newStyle);
        // newStyle = styleState.setIn(
        //   ["layers", layerIdx, "source"],
        //   fromJS(sourceToBePush)
        // );
        // console.log(styleState.get("layers").get(layerIdx));
        // console.log(
        //   styleState
        //     .get("layers")
        //     .get(layerIdx)
        //     .get("paint")
        // );
        // console.log(styleState.getIn(["layers", layerIdx, "paint"]));
        // console.log(paintToBePush);
        // // update paint property
        newStyle = styleState.updateIn(["layers", layerIdx], property => {
          return property.set("paint", fromJS(paintToBePush));
        });
      }
      return newStyle;
    }

    default:
      return styleState;
  }
}
