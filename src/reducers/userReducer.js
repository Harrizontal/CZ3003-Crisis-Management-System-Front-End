import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        contacts: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        contact: action.payload
      };

    default:
      return state;
  }
}
