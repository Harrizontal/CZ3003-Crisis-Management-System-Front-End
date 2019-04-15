import { infoConstants as constants } from "../constants";

//let user = JSON.parse(localStorage.getItem("user"));
//const initialState = user ? { loggedIn: true, user } : {};

const initialState = {
  // inc: {} // for edit page
};

export function map(state = initialState, action) {
  switch (action.type) {
    case constants.GET_MAP_DATA:
      return { ...state, mapData: action.payload };
    default:
      return state;
  }
}
