import React from "react";
import "./styles.scss";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const ExampleRaw = ({
  fullName,
  billingDate,
  lastTransferDate,
  guaranteeCompany
}) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{billingDate}</td>
      <td>{lastTransferDate}</td>
      <td>{guaranteeCompany}</td>
    </tr>
  );
};
const ExampleTable = () => {
  const exampleraws = [];
  var i;
  for (i = 0; i < 4; i++) {
    exampleraws.push(<ExampleRaw key={i} fullName="山田" />);
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>入居者名</th>
          <th>請求日</th>
          <th>最終振込日</th>
          <th>保証会社</th>
        </tr>
      </thead>
      <tbody>{exampleraws}</tbody>
    </Table>
  );
};

const GuaranteePage = () => {
  return (
    <div>
      <header>支払い請求</header>
      <div className="block">
        <ExampleTable />
      </div>
    </div>
  );
};

export default GuaranteePage;
