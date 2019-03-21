import { fromJS } from "immutable";
import MAP_STYLE from "./map-style-basic-v8.json";

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
  id: "data",
  source: "incomeByState",
  type: "fill",
  interactive: true,
  paint: {
    "fill-color": {
      type: "exponential",
      base: 10,
      stops: [[0, "#5e030e"], [12, "#d53e4f"]]
    },
    "fill-opacity": 0.8
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
