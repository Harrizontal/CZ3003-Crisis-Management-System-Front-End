import { incidentConstants } from "../constants";
import { incidentData } from "../components/map/map-style";
//let user = JSON.parse(localStorage.getItem("user"));
// const initialState = user ? { loggedIn: true, user } : {};

const initialState2 = {
  incidents: [],
  incident: {},
  mapSourceData: null,
  type: null
};

export function incident(state = initialState2, action) {
  let newState;
  switch (action.type) {
    case incidentConstants.GET_INCIDENTS:
      var sourceData = {
        type: "FeatureCollection",
        features: action.payload["data"]
      };
      newState = {
        ...state,
        incidents: action.payload["data"],
        mapSourceData: sourceData,
        type: "marker"
      };

      return newState;
    case incidentConstants.GET_INCIDENT:
      newState = {
        ...state,
        incident: action.payload
      };
      return newState;
    default:
      return state;
  }
}
