import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import { authentication } from "./authenticationReducer";
import { incident as incidentReducer } from "./incidentReducer";
import { overviewReducer } from "./overviewReducer";
import StylesheetReducer from "./reducer_stylesheet";
import UserIntReducer from "./reduce_userInt";
import mapReducer from "./mapReducer";

export default combineReducers({
  contact: contactReducer,
  authentication,
  incident: incidentReducer,
  overviewInformation: overviewReducer,
  //mapStyle: StylesheetReducer,
  userInterface: UserIntReducer,
  mapInformation: mapReducer
});
