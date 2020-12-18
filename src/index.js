import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { Auth0Provider } from "@auth0/auth0-react";

const rootElement = document.getElementById("root");
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // rootElement
  // <Auth0Provider
  //   domain="dev-mog04oe0.jp.auth0.com"
  //   clientId="sMlp24UoIoNavHLO9lidTHgOARFzgxgG"
  //   redirectUri={window.location.origin}
  // >
  <Auth0ProviderWithHistory>
    <Router>
      <App />
    </Router>
  </Auth0ProviderWithHistory>,
  rootElement
);
