import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapView from "./components/map/Map_old2";
// import UberMap from "./components/map/Map_old";
// import Contacts from "./components/contacts/Contacts";
// import AddContact from "./components/contacts/AddContact";
// import EditContact from "./components/contacts/EditContact";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";

import { Provider } from "react-redux";
import store from "./store";

import { PrivateRoute } from "./routes/PrivateRoute";

import "./App.css";
import PublicIncident from "./components/pages/PublicIncident";

// for CMS
import Overview from "./components/pages/cms";
import { PrivateRoute2 } from "./routes/PrivateRoute2";
import EditContact from "./components/pages/cms/contacts/EditContact";
import IncidentEdit from "./components/pages/cms/incidents/IncidentEdit";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div>
              <Switch>
                <PrivateRoute path="/cms" component={Overview} />
                <PrivateRoute2 path="/login" component={Login} />
                <Route exact path="/" component={PublicIncident} />
                <Route exact path="/map" component={MapView} />
                <Route exact path="/logout" component={About} />
                {/* <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} /> */}
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
