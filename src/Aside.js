import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";
import { FaPenNib, FaGem, FaList, FaChartLine } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

import Api from "./AjaxHelper";

const makeMenuItem = (setItems) => {
  const api = new Api();
  api.getApartments().then((result) => {
    const oneitem = result.data.map((c) => {
      return (
        <MenuItem key={c.id}>
          <Link to={"/apartment/" + c.id}>{c.name}</Link>
        </MenuItem>
      );
    });
    setItems(oneitem);
  });
};
const Aside = ({
  image,
  collapsed,
  setCollapsed,
  rtl,
  toggled,
  handleToggleSidebar
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    makeMenuItem(setItems);
  }, []);
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
          <MenuItem
            icon={<FaList />}
            onClick={() => setCollapsed(!collapsed)}
          ></MenuItem>
        </Menu>
      </SidebarHeader>
      <Menu iconShape="circle">
        <MenuItem icon={<FaChartLine />}>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem icon={<BiTransfer />}>
          <Link to="/transfer">入金確認</Link>
        </MenuItem>
        <MenuItem icon={<FaPenNib />}>
          <Link to="/guarantee">代弁請求</Link>
        </MenuItem>
        <SubMenu title="物件詳細">{items}</SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Aside;
