import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DashboardPage, DetailPages } from "./components/pages/index";
import {
  finalizePageObj,
  resultsPageObj,
} from "./components/pages/DetailPages/Data";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/finalize/:id" exact>
        <DetailPages {...finalizePageObj} />
      </Route>
      <Route path="/results/:id" exact>
        <DetailPages {...resultsPageObj} />
      </Route>
      <Redirect to="/" exact component={DashboardPage} />
    </Switch>
  );
}

export default Routes;
