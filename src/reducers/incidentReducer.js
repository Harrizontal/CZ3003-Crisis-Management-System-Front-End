import { incidentConstants } from "../constants";

//let user = JSON.parse(localStorage.getItem("user"));
// const initialState = user ? { loggedIn: true, user } : {};

const initialState2 = {
  incidents: []
  // inc: {} // for edit page
};

export function incident(state = initialState2, action) {
  switch (action.type) {
    case incidentConstants.GET_INCIDENTS:
      console.log("incidentConstants.GET_INCIDENTS @ incidentReducer");
      const test = {
        ...state,
        incidents: action.payload
      };

      console.log(state);
      return test;
    case incidentConstants.GET_INCIDENT:
      return {};

    case incidentConstants.ADD_INCIDENT:
      return {};
    case incidentConstants.UPDATE_INCIDENT:
      return {};
    case incidentConstants.DELETE_INCIDENT:
      return {};
    case incidentConstants.UPDATE_INCIDENT:
      return {};
    default:
      return state;
  }
}
