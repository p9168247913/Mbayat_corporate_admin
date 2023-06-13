import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const auth = cookies.get("accessToken");

const PrivateRoute = ({ exact, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      auth ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/login`}></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
