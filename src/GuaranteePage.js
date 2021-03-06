import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";

import Api from "./AjaxHelper";
import CustomToast from "./CustomToast";
import GuaranteeGraph from "./GuaranteeGraph";
const getResidents = (args, setIsLoaded, setItems, setError, apartment_id) => {
  const api = new Api();
  const query = { params: { billing: true } };
  api
    .getResidents(query)
    .then((result) => {
      const exampleraws = result.data.map((c) => {
        return (
          <TransferRaw
            args={args}
            setIsLoaded={setIsLoaded}
            setItems={setItems}
            setError={setError}
            key={c.id}
            id={c.id}
            fullName={c.fullName}
            transferAmount={c.transferAmount}
            guaranteeCompany={c.guaranteeCompany}
            lastTransferAmount={c.lastTransferAmount}
            lastTransferDate={c.lastTransferDate}
            lastBillingDate={c.lastBillingDate}
            transferSatisfiedMonth={c.transferSatisfiedMonth}
            apartment_id={apartment_id}
          />
        );
      });
      setIsLoaded(true);
      setItems(exampleraws);
    })
    .catch((error) => {
      setIsLoaded(false);
      setError(error);
    });
};

const TransferModal = ({
  args,
  id,
  fullName,
  lastTransferDate,
  lastTransferAmount,
  lastBillingDate,
  handleClose,
  show,
  setIsLoaded,
  setItems,
  setError,
  apartment_id
}) => {
  const [billingDate, setBillingDate] = useState(lastBillingDate);
  const [transferDate, setTransferDate] = useState(lastTransferDate);
  const [transferAmount, setTransferAmount] = useState(lastTransferAmount);
  // these handllers set statevalue when form-imput value changed
  const handleTDateOnchange = (e) => {
    setTransferDate(e.target.value);
  };
  const handleTAmountOnchange = (e) => {
    setTransferAmount(e.target.value);
  };
  const handleBDateOnchange = (e) => {
    setBillingDate(e.target.value);
  };
  const handleClick = () => {
    handleClose();
    const api = new Api();
    api
      .postTransfer(transferDate, transferAmount, id)
      .then((result) => {
        args.setToastMessage({
          message: "更新しました",
          class: "text-success"
        });
        args.setShowToast(true);
      })
      .catch((error) => {
        if (error.response.status !== 409) {
          args.setToastMessage({ message: "更新失敗", class: "text-danger" });
          args.setShowToast(true);
        }
      })
      .then(() => {
        if (!billingDate) return;
        const api = new Api();
        api
          .postBilling(billingDate, id)
          .then((result) => {
            args.setToastMessage({
              mesage: "更新しました",
              class: "text-succes"
            });
            args.setShowToast(true);
          })
          .catch((error) => {
            if (error.response.status !== 409) {
              args.setToastMessage({
                message: "更新失敗",
                class: "text-danger"
              });
              args.setShowToast(true);
            }
          });
      })
      .then(
        setTimeout(() => {
          getResidents(args, setIsLoaded, setItems, setError, apartment_id);
        }, 2000)
      );
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="lastTransferDate">
              <Form.Label>振込日</Form.Label>
              <Form.Control
                type="date"
                defaultValue={lastTransferDate}
                onChange={handleTDateOnchange}
              />
            </Form.Group>
            <Form.Group controlId="lastTransferAmount">
              <Form.Label>振込金額</Form.Label>
              <Form.Control
                type="number"
                defaultValue={lastTransferAmount}
                onChange={handleTAmountOnchange}
              />
            </Form.Group>
            <Form.Group controlId="lastBillingDate">
              <Form.Label>代弁請求日</Form.Label>
              <Form.Control
                type="date"
                defaultValue={lastBillingDate}
                onChange={handleBDateOnchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const TransferRaw = ({
  args,
  id,
  fullName,
  lastTransferDate,
  lastTransferAmount,
  lastBillingDate,
  transferAmount,
  guaranteeCompany,
  transferSatisfiedMonth,
  setIsLoaded,
  setItems,
  setError,
  apartment_id
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const today = new Date();
  const dates = new Date(transferSatisfiedMonth);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  const datesFirstDay = new Date(dates.getFullYear(), dates.getMonth());

  var className = "";
  if (datesFirstDay < nextMonth) {
    className = "table-danger";
  }
  return (
    <>
      <tr className={className} onClick={handleShow}>
        <td>
          <Link to={"/resident?id=" + id}>{fullName}</Link>
        </td>
        <td>{lastTransferDate}</td>
        <td>{lastBillingDate}</td>
        <td>
          {year} 年 {month} 月
        </td>
        <td>{guaranteeCompany}</td>
      </tr>
      <TransferModal
        args={args}
        fullName={fullName}
        lastTransferDate={lastTransferDate}
        lastTransferAmount={lastTransferAmount}
        lastBillingDate={lastBillingDate}
        handleClose={handleClose}
        show={show}
        id={id}
        setIsLoaded={setIsLoaded}
        setItems={setItems}
        setError={setError}
        apartment_id={apartment_id}
      />
    </>
  );
};
const GuaranteeTable = ({ args, apartment_id }) => {
  // const exampleraws = [];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getResidents(args, setIsLoaded, setItems, setError, apartment_id);
  }, [args, apartment_id]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>入居者名</th>
            <th>最終振込日</th>
            <th>代弁請求日</th>
            <th>支払済み</th>
            <th>保証会社</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
};

const GuaranteePage = () => {
  const [showtoast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "更新失敗",
    class: "text-error"
  });

  const args = {
    showtoast: showtoast,
    setShowToast: setShowToast,
    toastMessage: toastMessage,
    setToastMessage: setToastMessage
  };

  return (
    <>
      <div className="container pb-3 mb-5 pt-3 border-bottom">
        <h1>代弁請求</h1>
      </div>
      <Card className="m-2 p-3">
        <GuaranteeTable args={args} />
      </Card>
      <Card className="m-2 p-3">
        <GuaranteeGraph />
      </Card>
      <CustomToast
        message={toastMessage}
        show={showtoast}
        setShow={setShowToast}
      />
    </>
  );
};

export default GuaranteePage;
