import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import { authentication } from "./authenticationReducer";
import { incident as incidentReducer } from "./incidentReducer";
import { map as infoReducer } from "./infoReducer";
import StylesheetReducer from "./reducer_stylesheet";
import UserIntReducer from "./reduce_userInt";

export default combineReducers({
  contact: contactReducer,
  authentication,
  incident: incidentReducer,
  map: infoReducer,
  mapStyle: StylesheetReducer,
  userInterface: UserIntReducer
});
