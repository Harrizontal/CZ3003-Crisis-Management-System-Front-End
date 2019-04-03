import Immutable from "immutable";
import popupCreator from "./popup";

export default function UserIntReducer(userIntState = null, action) {
  switch (action.type) {
    case "CHANGE_VIZ": {
      console.log("CHANGE_VIZ @ reduce_userInt");
      return userIntState.set("activeButton", action.payload);
    }

    case "CLICK_MAP": {
      const html = popupCreator(action.payload);
      return userIntState.set("popup", html);
    }
    default:
      return userIntState;
  }

  return userIntState;
}
