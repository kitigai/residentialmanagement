import React, { useState } from "react";
import "./styles.scss";
import Aside from "./Aside";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";

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

export default App;
