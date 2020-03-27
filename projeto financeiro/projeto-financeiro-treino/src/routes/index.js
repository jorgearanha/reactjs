import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NovaMovimentacao from "../pages/NovaMovimentacao";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/nova-movimentacao" component={NovaMovimentacao} />
      </Switch>
    </Router>
  );
};

export default Routes;
