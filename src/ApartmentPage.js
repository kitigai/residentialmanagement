import React, { useState, useEffect } from "react";
import Api from "./AjaxHelper";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import CustomToast from "./CustomToast";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./styles.scss";

const CustomModal = ({
  show,
  handleClose,
  argName,
  argAddress,
  id,
  setToastMessage,
  setShowToast
}) => {
  const [name, setName] = useState(argName);
  const [address, setAddress] = useState(argAddress);
  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressOnChange = (e) => {
    setAddress(e.target.value);
  };
  const handleClick = () => {
    handleClose();
    const api = new Api();
    const query = {
      id: id,
      name: name,
      address: address
    };
    api
      .postApartments(query)
      .then((response) => {
        setShowToast(true);
        setToastMessage({ message: "更新成功", class: "text-success" });
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage({ message: "更新失敗", class: "text-danger" });
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>物件情報更新</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>物件名称</Form.Label>
            <Form.Control
              type="text"
              defaultValue={name}
              onChange={handleNameOnChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>住所</Form.Label>
            <Form.Control
              type="text"
              defaultValue={address}
              onChange={handleAddressOnChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const makeSummaryChart = (
  id,
  setChartData,
  setIncomeThisMonth,
  setIncomeLastMonth
) => {
  const api = new Api();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const span = 12;
  const query = {
    params: { id: id, startMonth: month, startYear: year, span: span }
  };
  const delta = [];
  for (var i = span - 1; i >= 0; i--) {
    const deltaday = new Date();
    deltaday.setMonth(deltaday.getMonth() - i);
    delta.push(deltaday.getMonth() + 1);
  }

  api.getApartments(query).then((result) => {
    const chartData = {
      labels: delta,
      datasets: [
        {
          label: "summary",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: result.data.transferSummary
        }
      ]
    };
    setIncomeThisMonth(result.data.transferSummary.slice(-1)[0]);
    setIncomeLastMonth(result.data.transferSummary.slice(-2)[0]);
    setChartData(chartData);
  });
};
const CustomLineChart = ({ data }) => {
  return (
    <MDBContainer>
      <Line data={data} options={{ responsive: true }} />
    </MDBContainer>
  );
};
const makeTableRows = (residents, setItems, apartment_id) => {
  const item = residents.map((resident) => {
    const date = new Date(resident.transferSatisfiedMonth);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return (
      <tr>
        <td>
          <Link
            to={"/resident?id=" + resident.id + "&apartment_id=" + apartment_id}
          >
            {resident.fullName}
          </Link>
        </td>
        <td>{resident.roomNo}</td>
        <td>{resident.parkingLotNo}</td>
        <td>{resident.transferAmount}</td>
        <td>{year + " 年" + month + " 月"}</td>
        <td>{resident.guaranteeCompany}</td>
      </tr>
    );
  });
  setItems(item);
};
const ApartmentPage = ({ id, info }) => {
  const [chartData, setChartData] = useState({});
  const [incomeThisMonth, setIncomeThisMonth] = useState(0);
  const [incomeLastMonth, setIncomeLastMonth] = useState(0);
  const [showtoast, setShowToast] = useState(false);
  const [items, setItems] = useState([]);
  const [toastMessage, setToastMessage] = useState({
    message: "更新失敗",
    class: "text-danger"
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // show for adding user
  const [showAdding, setShowAdding] = useState(false);
  const handleCloseAdding = () => setShowAdding(false);
  const handleShowAdding = () => setShowAdding(true);
  useEffect(() => {
    makeSummaryChart(id, setChartData, setIncomeThisMonth, setIncomeLastMonth);
    const api = new Api();
    api.getApartments({ params: { id: id } }).then((res) => {
      makeTableRows(res.data[0].residents, setItems, id);
    });
  }, []);

  return (
    <>
      <div className="container pb-3 mb-5 pt-3 border-bottom">
        <h1>{info.name}</h1>
      </div>
      <div className="container">
        <CardDeck>
          <Card className="col-sm-3 m-2">
            <Card.Body>
              <Card.Title className="mb-3">
                <h3>物件情報</h3>
              </Card.Title>
              <Card.Subtitle>当月収入</Card.Subtitle>
              <Card.Text className="text-secondary mb-3">
                {incomeThisMonth.toLocaleString()}
              </Card.Text>
              <Card.Subtitle className="mb-1">先月収入</Card.Subtitle>
              <Card.Text className="text-secondary mb-3">
                {incomeLastMonth.toLocaleString()}
              </Card.Text>
              <Card.Subtitle>物件名称</Card.Subtitle>
              <Card.Text className="text-secondary mb-3">{info.name}</Card.Text>
              <Card.Subtitle>住所</Card.Subtitle>
              <Card.Text className="text-secondary mb-3">
                {info.address}
              </Card.Text>
              <Button variant="outline-primary" onClick={handleShow}>
                変更
              </Button>{" "}
            </Card.Body>
          </Card>
          <Card className="col-sm-9 m-2">
            <Card.Body>
              <Card.Title className="mb-3">
                <h3>収入状況</h3>
              </Card.Title>
              <CustomLineChart data={chartData} />
            </Card.Body>
          </Card>
        </CardDeck>
        <CardDeck>
          <Card className="col-sm-12 m-2">
            <Card.Body>
              <Card.Title className="mb-3 d-flex flex-row">
                <h3 className="col-sm-11">入居者</h3>
                <Button variant="light" className="float-right">
                  <Link to={"/resident?apartment_id=" + info.id}>
                    <FaPlus />
                  </Link>
                </Button>
              </Card.Title>
              <Table hover>
                <thead>
                  <tr>
                    <th>入居者名</th>
                    <th>部屋番号</th>
                    <th>駐車場番号</th>
                    <th>支払い金額</th>
                    <th>支払済月</th>
                    <th>保証会社</th>
                  </tr>
                </thead>
                <tbody>{items}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
      <CustomModal
        show={show}
        handleClose={handleClose}
        argName={info.name}
        argAddress={info.address}
        id={id}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
      />
      <CustomToast
        message={toastMessage}
        show={showtoast}
        setShow={setShowToast}
      />
    </>
  );
};

export default ApartmentPage;
