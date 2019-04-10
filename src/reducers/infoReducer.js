import { infoConstants as constants } from "../constants";

//let user = JSON.parse(localStorage.getItem("user"));
//const initialState = user ? { loggedIn: true, user } : {};

const initialState = {
  // inc: {} // for edit page
};

export function map(state = initialState, action) {
  switch (action.type) {
    case constants.GET_MAP_DATA:
      console.log("dispatch! and the payload recieved");
      console.log(action.payload);
      //   const test = {
      //     ...state,
      //     mapData: action.payload
      //   };
      console.log("The state is:");
      console.log(state);
      return { ...state, mapData: action.payload };
    default:
      return state;
  }
}
