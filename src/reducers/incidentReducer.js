import { incidentConstants } from "../constants";
import {
  dengueData,
  dengueLayerPaint,
  fillLayerFormat,
  weatherData,
  weatherData2,
  weatherLayerPaint,
  incidentData
} from "../components/map/map-style";
//let user = JSON.parse(localStorage.getItem("user"));
// const initialState = user ? { loggedIn: true, user } : {};

const initialState2 = {
  incidents: [],
  incident: {},
  data: "",
  paint: ""
  // inc: {} // for edit page
};

export function incident(state = initialState2, action) {
  let newState;
  switch (action.type) {
    case incidentConstants.GET_INCIDENTS:
      console.log("incidentConstants.GET_INCIDENTS @ incidentReducer");

      newState = {
        ...state,
        incidents: action.payload["features"],
        mapSourceData: incidentData,
        type: "marker"
      };

      console.log(newState);
      return newState;
    case incidentConstants.GET_INCIDENT:
      console.log("asdasdasdas");
      newState = {
        ...state,
        incident: action.payload
      };
      return newState;
    default:
      return state;
  }
}
