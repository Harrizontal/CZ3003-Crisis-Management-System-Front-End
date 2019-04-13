import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute2 = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Redirect to={{ pathname: "/cms", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
