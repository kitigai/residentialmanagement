import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Switch, Route, useLocation } from "react-router-dom";

import TransferPage from "./TransferPage";
import GuaranteePage from "./GuaranteePage";
import HomePage from "./HomePage";
import ApartmentPage from "./ApartmentPage";
import ResidentPage from "./Resident";
import Api from "./AjaxHelper";
import { FaBars } from "react-icons/fa";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Main = ({ handleToggleSidebar }) => {
  const [items, setItems] = useState([]);
  let query = useQuery();
  useEffect(() => {
    const api = new Api();
    api.getApartments().then((result) => {
      const item = result.data.map((c) => {
        return (
          <Route exact path={"/apartment/" + c.id} key={c.id}>
            <ApartmentPage id={c.id} />
          </Route>
        );
      });
      setItems(item);
    });
  }, []);
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <Switch>
        <Route exact path="/dashboard">
          <HomePage />
        </Route>
        <Route exact path="/transfer">
          <TransferPage />
        </Route>
        <Route exact path="/guarantee">
          <GuaranteePage />
        </Route>
        {items}
        {/* <Route exact path="/apartment">
          <ApartmentPage />
        </Route> */}
        <Route exact path="/resident">
          <ResidentPage
            id={query.get("id")}
            apartment_id={query.get("apartment_id")}
          />
        </Route>
        <Route exact path="/apartment">
          <ApartmentPage id={query.get("id")} />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
