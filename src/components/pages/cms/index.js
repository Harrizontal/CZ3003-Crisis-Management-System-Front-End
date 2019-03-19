import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contacts from "./contacts/Contacts";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import Header from "../../layout/Header";
import MapView from "../../map/Map_old2";
import Overview from "./Overview";

const routes = [
  {
    path: "/cms",
    exact: true,
    sidebar: () => <div>Dashboard</div>,
    main: Overview
  },
  {
    path: "/cms/incidents",
    sidebar: () => <div>Incidents</div>,
    main: Contacts
  },
  {
    path: "/cms/incident/edit/:id",
    sidebar: () => <div>Incidents</div>,
    main: EditContact
  }
];

export default () => {
  return (
    <React.Fragment>
      <Header branding="Welcome to CMS" />
      <div>
        <ul>
          <li>
            <Link to="/cms">Overview</Link>
          </li>
          <li>
            <Link to="/cms/incidents">Incidents</Link>
          </li>
          <li>
            <Link to="/cms/agencies">Agencies</Link>
          </li>
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
