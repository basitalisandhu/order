import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthContainer } from "./containers/auth";

const AuthRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/login`} exact component={AuthContainer} />
    <Redirect to={`${url}/login`} />
  </Switch>
);

export default AuthRoutes;
