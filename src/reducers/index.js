import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import { authentication } from "./authenticationReducer";

export default combineReducers({
  contact: contactReducer,
  authentication
});
