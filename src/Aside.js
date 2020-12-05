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

import Button from "react-bootstrap/Button";
import "react-pro-sidebar/dist/css/styles.css";

const Aside = ({
  image,
  collapsed,
  setCollapsed,
  rtl,
  toggled,
  handleToggleSidebar
}) => {
  const col = collapsed;
  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
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
        <MenuItem icon={<FaTachometerAlt />}>aaaaa</MenuItem>
        <MenuItem icon={<FaGem />}>aaaa</MenuItem>
        <SubMenu title="Components">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Aside;
