import React from "react";

import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NovaMovimentacao from "../pages/NovaMovimentacao";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/nova-movimentacao" component={NovaMovimentacao} />
      <Route path="/editar-movimentacao/:flag/:id" component={NovaMovimentacao} />
    </Switch>
  );
};

export default Routes;
