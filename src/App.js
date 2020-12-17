import React, { useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import "./styles.scss";
import Aside from "./Aside";
import Main from "./Main";
import LoadingPage from "./LoadingPage";

const App = () => {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  // const handleCollapsedChange = (checked) => {
  //   setCollapsed(checked);
  // };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div className="app">
      <Aside
        image={image}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Main handleToggleSidebar={handleToggleSidebar} />
    </div>
  );
};

export default withAuthenticationRequired(App, {
  onRedirecting: () => <LoadingPage />
});
