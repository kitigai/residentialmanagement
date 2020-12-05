import React from "react";
import { useIntl } from "react-intl";
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

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();
  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {intl.formatMessage({ id: "sidebarTitle" })}
        </div>
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
