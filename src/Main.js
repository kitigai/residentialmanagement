import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Switch, Route, useLocation } from "react-router-dom";

import TransferPage from "./TransferPage";
import GuaranteePage from "./GuaranteePage";
import HomePage from "./HomePage";
import ApartmentPage from "./ApartmentPage";
import ResidentPage from "./Resident";
import Api from "./AjaxHelper";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Main = () => {
  const [items, setItems] = useState([]);
  let query = useQuery();
  useEffect(() => {
    const api = new Api();
    api.getApartments().then((result) => {
      const item = result.data.map((c) => {
        return (
          <Route exact path={"/apartment/" + c.id} key={c.id}>
            <ApartmentPage id={c.id} info={c} />
          </Route>
        );
      });
      setItems(item);
    });
  }, []);
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
        {items}
        {/* <Route path="/resident/:id" children={<ResidentPage />} /> */}
        <Route exact path="/resident">
          <ResidentPage
            id={query.get("id")}
            apartment_id={query.get("apartment_id")}
          />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
