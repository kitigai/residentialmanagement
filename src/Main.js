import React from "react";
import "./styles.scss";
import { Switch, Route } from "react-router-dom";

import TransferPage from "./TransferPage";
import GuaranteePage from "./GuaranteePage";
import HomePage from "./HomePage";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/transfer">
          <TransferPage />
        </Route>
        <Route exact path="/guarantee">
          <GuaranteePage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
