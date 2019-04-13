import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import EnterMobilePostal from "./components/pages/EnterMobilePostal";

import { Provider } from "react-redux";
import store from "./store";

import { PrivateRoute } from "./routes/PrivateRoute";

import "./App.css";
import PublicIncident from "./components/pages/PublicIncident";

// for CMS
import Overview from "./components/pages/cms";
import { PrivateRoute2 } from "./routes/PrivateRoute2";

import RelevantAgency from "./components/pages/RelevantAgency";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/CZ3003_CMS_FrontEnd">
          <div className="App">
            <div>
              <Switch>
                <PrivateRoute path="/cms" component={Overview} />
                <PrivateRoute2 path="/login" component={Login} />
                <Route exact path="/" component={PublicIncident} />
                <Route path="/ra/:id" component={RelevantAgency} />
                <Route exact path="/subscribe" component={EnterMobilePostal} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
