import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";

const Aside = ({
  image,
  collapsed,
  setCollapsed,
  rtl,
  toggled,
  handleToggleSidebar
}) => {
  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="xs"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader icon={<FaGem />}>
        <Menu iconShape="circle">
          <MenuItem icon={<FaList />} onClick={() => setCollapsed(!collapsed)}>
            Test
          </MenuItem>
        </Menu>
      </SidebarHeader>
      <Menu iconShape="circle">
        <MenuItem icon={<FaTachometerAlt />}>
          <Link to="/" />
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Link to="/transfer">入金確認</Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Link to="/guarantee">請求代行</Link>
        </MenuItem>
        <SubMenu title="Components">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Aside;
