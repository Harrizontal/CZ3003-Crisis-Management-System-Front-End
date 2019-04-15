import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState, saveState } from "./loadStorage";
import Immutable from "immutable";

function hydrate(usePrevious = null) {
  if (!usePrevious) {
    return {
      mapStyle: null,
      userInterface: Immutable.fromJS({
        activeButton: "age",
        activeLayer: "buildings",
        popup: null
      })
    };
  }
}

const initialState = hydrate();

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
