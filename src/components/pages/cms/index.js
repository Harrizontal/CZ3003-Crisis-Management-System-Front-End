import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contacts from "./contacts/Contacts";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import Header from "../../layout/Header";
import MapView from "../../map/Map_old2";
import Overview from "./Overview";
import Setting from "./Setting";
import { Incidents } from "./incidents";

const routes = [
  {
    path: "/cms",
    exact: true,
    sidebar: "Dashboard",
    main: Overview
  },
  {
    path: "/cms/incidents",
    sidebar: "Incidents",
    main: Incidents
    // use to be Contacts, take note
  },
  {
    path: "/cms/incident/edit/:id",
    main: EditContact
  },
  {
    path: "/cms/setting",
    sidebar: "Setting",
    main: Setting
  }
];

export default () => {
  return (
    <React.Fragment>
      <Header branding="Welcome to CMS" />
      <div>
        <ul>
          {routes.map((route, index) =>
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            route.sidebar ? (
              <li>
                <Link to={route.path}>{route.sidebar}</Link>
              </li>
            ) : null
          )}
        </ul>
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
