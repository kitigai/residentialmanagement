import React from "react";
import "./styles.scss";

import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  return (
    <ProSidebar breakPoint="sm">
      <Menu iconShape="square">
        <MenuItem>Dashboard</MenuItem>
        <SubMenu title="Components">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>

        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Dashboard</MenuItem>
      </Menu>
    </ProSidebar>
  );
};

const ExampleTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <header>aaaai</header>
        <div className="block">
          <ExampleTable />
        </div>
      </main>
    </div>
  );
};

export default App;
