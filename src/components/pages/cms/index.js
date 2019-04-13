import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "../../layout/Header";
import Overview from "./overview/Overview";
import Setting from "./settings/Setting";
import Popup from "reactjs-popup";
import Report from "./report/Report";
import { IncidentsOverview, IncidentsOverview2 } from "./incidents";
import IncidentEdit from "./incidents/IncidentEdit";
import IncidentCreate from "./incidents/IncidentCreate";

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
    main: IncidentsOverview
  },
  {
    path: "/cms/incidentcreate",
    main: IncidentCreate
  },

  {
    path: "/cms/incident/:id",
    main: IncidentEdit
  },
  {
    path: "/cms/setting",
    sidebar: "Settings",
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

              <li>
                <Popup trigger={<a>Report</a>} modal closeOnDocumentClick>
                  <Report />
                </Popup>
              </li>
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
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};
