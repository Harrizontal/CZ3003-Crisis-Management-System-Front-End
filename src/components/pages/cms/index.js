import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contacts from "./contacts/Contacts";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import Header from "../../layout/Header";
import Overview from "./overview/Overview";
import Setting from "./Setting";
import { IncidentsOverview, IncidentsOverview2 } from "./incidents";

const routes = [
  {
    path: "/cms",
    exact: true,
    sidebar: "Dashboard",
    main: Overview
  },
  {
    path: "/cms/incidents",
    sidebar: "Live Incidents",
    main: IncidentsOverview2
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
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}
      >
        <div
          style={{
            order: 0,
            width: "100%",
            height: "10%",
            display: "flex",
            zIndex: 3,
            boxShadow: "0px 4px 6px -6px rgba(0,0,0,0.25)"
          }}
        >
          <Header style={{ width: "100px" }} />
          <div className="toolbar_navigation-items">
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
        </div>
        <div
          style={{
            order: 1,
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start"
          }}
        >
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
      </div>
    </React.Fragment>
  );
};
