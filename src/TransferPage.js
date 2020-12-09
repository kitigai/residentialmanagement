import React, { useState, useEffect } from "react";
import "./styles.scss";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

import Api from "./AjaxHelper";

const ExampleRaw = ({
  fullName,
  lastTransferDate,
  lastTransferAmount,
  transferAmount,
  guaranteeCompany
}) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{lastTransferDate}</td>
      <td>{lastTransferAmount}</td>
      <td>{transferAmount}</td>
      <td>{guaranteeCompany}</td>
    </tr>
  );
};
const ExampleTable = () => {
  const exampleraws = [];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const api = new Api();
    api
      .getResidents()
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      })
      .catch((error) => {
        setIsLoaded(false);
        setError(error);
      });
  }, []);

  //   fetch("https://residentsmanagement.herokuapp.com/residents")
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       (error) => {
  //         setIsLoaded(false);
  //         setError(error);
  //       }
  //     );
  // }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    items.map((item) => <ExampleRaw key={item.id} fullName={item.fullName} />);
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>入居者名</th>
            <th>最終振込日</th>
            <th>最終振込金額</th>
            <th>振込金額</th>
            <th>保証会社</th>
          </tr>
        </thead>
        <tbody>{exampleraws}</tbody>
      </Table>
    );
  }
};

const TransferPage = () => {
  return (
    <div>
      <header>入金確認</header>
      <div className="block">
        <ExampleTable />
      </div>
    </div>
  );
};

export default TransferPage;
