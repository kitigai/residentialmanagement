import React, { useState, useEffect } from "react";
import Api from "./AjaxHelper";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import CustomToast from "./CustomToast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const fetchDatas = (
  id,
  setFullName,
  setRoomNo,
  setParkingLotNo,
  setTransferAmount,
  setTransferSatisfiedMonth,
  setGuaranteeCompany,
  setReadonly,
  setTransfer,
  setToastMessage,
  setToastShow
) => {
  const fetchargs = [
    id,
    setFullName,
    setRoomNo,
    setParkingLotNo,
    setTransferAmount,
    setTransferSatisfiedMonth,
    setGuaranteeCompany,
    setReadonly,
    setTransfer,
    setToastMessage,
    setToastShow
  ];
  const api = new Api();
  api.getSingleResident(id).then((response) => {
    const data = response.data[0];
    setFullName(data.fullName);
    setRoomNo(data.roomNo);
    setParkingLotNo(data.parkingLotNo);
    setTransferAmount(data.transferAmount);
    setTransferSatisfiedMonth(data.transferSatisfiedMonth);
    setGuaranteeCompany(data.guaranteeCompany);
    setReadonly(true);
    setTransfer(
      data.transfer.map((d) => {
        return (
          <CustomRow
            key={d.id}
            id={d.id}
            transferAmount={d.transferAmount}
            transferDate={d.transferDate}
            setToastMessage={setToastMessage}
            setToastShow={setToastShow}
            fetchArgs={fetchargs}
          />
          // <tr key={d.id}>
          //   <td>
          //     {d.transferAmount ? "¥" + d.transferAmount.toLocaleString() : ""}
          //   </td>
          //   <td>{d.transferDate}</td>
          //   <td>
          //     <Button variant="white">
          //       <FaTrash />
          //     </Button>
          //   </td>
          // </tr>
        );
      })
    );
  });
};
const CustomRow = ({
  id,
  transferAmount,
  transferDate,
  setToastShow,
  setToastMessage,
  fetchArgs
}) => {
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => {
    setDeleteShow(false);
  };
  const handleDeleteShow = () => {
    setDeleteShow(true);
  };
  const handleDelete = () => {
    const api = new Api();
    api
      .deleteTransfer(id)
      .then(() => {
        setToastShow(true);
        setToastMessage({
          message: "削除しました",
          class: "text-success"
        });
      })
      .catch(() => {
        setToastShow(true);
        setToastMessage({
          message: "削除に失敗しました",
          class: "text-danger"
        });
      })
      .then(() => {
        setDeleteShow(false);
        setTimeout(() => {
          fetchDatas(...fetchArgs);
        }, 1000);
      });
  };
  return (
    <tr key={id}>
      <td>{transferAmount ? "¥" + transferAmount.toLocaleString() : ""}</td>
      <td>{transferDate}</td>
      <td>
        <Button variant="white" onClick={handleDeleteShow}>
          <FaTrash />
        </Button>
      </td>
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Body className="text-danger">
          入金情報を削除しますか？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="secondary" onClick={handleDeleteClose}>
            キャンセル
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};
const ResidentPage = ({ id, apartment_id }) => {
  // with id update
  // without id create
  const history = useHistory();
  const [fullName, setFullName] = useState();
  const [roomNo, setRoomNo] = useState();
  const [parkingLotNo, setParkingLotNo] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [transferSatisfiedMonth, setTransferSatisfiedMonth] = useState();
  const [guaranteeCompany, setGuaranteeCompany] = useState();
  const [apartmentName, setApartmentName] = useState();
  const [transfer, setTransfer] = useState([]);
  const [readonly, setReadonly] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showtoast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "更新失敗",
    class: "text-error"
  });
  const [modalShow, setModalShow] = useState(false);
  const [transModalShow, setTransModalShow] = useState(false);
  const [newTData, setNewTData] = useState();
  const [newTAmount, setNewTAmount] = useState(0);
  const handleFullNameOnChange = (e) => {
    setFullName(e.target.value);
  };
  const handleRoomNoOnChange = (e) => {
    setRoomNo(e.target.value);
  };
  const handleParkingLotNoOnChange = (e) => {
    setParkingLotNo(e.target.value);
  };
  const handleTransferAmountOnChange = (e) => {
    setTransferAmount(e.target.value);
  };
  const handleGuaranteeCompanyOnChange = (e) => {
    setGuaranteeCompany(e.target.value);
  };
  const handleShow = () => {
    setReadonly(false);
    setButtonVisible(false);
  };
  const handleCancel = () => {
    setReadonly(true);
    setButtonVisible(true);
  };
  // delete Resident Info
  const handleDelete = () => {
    const api = new Api();
    api
      .deleteResident(id)
      .then((response) => {
        handleModalClose();
        history.push("/apartment/" + apartment_id);
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage({
          message: "更新失敗",
          class: "text-danger"
        });
      });
  };
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const handleTransModalClose = () => setTransModalShow(false);
  const handleTransModalShow = () => setTransModalShow(true);
  // Update Apartment Infomation
  const handleSave = () => {
    const api = new Api();
    const query = {
      id: id,
      fullName: fullName,
      transferAmount: transferAmount,
      transferSatisfiedMonth: transferSatisfiedMonth,
      guaranteeCompany: guaranteeCompany,
      roomNo: roomNo,
      parkingLotNo: parkingLotNo,
      apartment_id: apartment_id
    };
    let func;
    if (id) {
      // update
      func = api.putResidents;
    } else {
      func = api.postResidents;
    }
    func(query)
      .then((response) => {
        setShowToast(true);
        setToastMessage({
          message: "更新成功",
          class: "text-success"
        });
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage({
          message: "更新失敗",
          class: "text-danger"
        });
      });
    setReadonly(true);
    setButtonVisible(true);
  };
  const handleNewTDataOnChange = (e) => {
    setNewTData(e.target.value);
  };
  const handleNewTAmountOnChange = (e) => {
    setNewTAmount(e.target.value);
  };
  const handleTransferAddOpen = () => {
    handleTransModalShow();
  };
  // Create Transfer Record
  const handleTransferAdd = () => {
    handleTransModalClose();
    const api = new Api();

    api
      .postTransfer(newTData, newTAmount, id)
      .then((res) => {
        setShowToast(true);
        setToastMessage({
          message: "更新成功",
          class: "text-success"
        });
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage({
          message: "更新失敗",
          class: "text-danger"
        });
      })
      .then(() => {
        // reload page datas
        setTimeout(() => {
          fetchDatas(
            id,
            setFullName,
            setRoomNo,
            setParkingLotNo,
            setTransferAmount,
            setTransferSatisfiedMonth,
            setGuaranteeCompany,
            setReadonly,
            setTransfer
          );
        }, 2000);
      });
  };
  useEffect(() => {
    if (!id) {
      setReadonly(false);
      setButtonVisible(false);
    } else {
      fetchDatas(
        id,
        setFullName,
        setRoomNo,
        setParkingLotNo,
        setTransferAmount,
        setTransferSatisfiedMonth,
        setGuaranteeCompany,
        setReadonly,
        setTransfer,
        setToastMessage,
        setShowToast
      );
    }
    const api = new Api();
    const query = { params: { id: apartment_id } };
    api.getApartments(query).then((response) => {
      setApartmentName(response.data[0].name);
    });
  }, [apartment_id, id]);
  return (
    <>
      <div className="container pb-3 mb-5 pt-3 border-bottom">
        <h1>入居者詳細</h1>
        <Button
          variant="light"
          className="float-right"
          onClick={handleModalShow}
        >
          <FaTrash />
        </Button>
      </div>
      <CardDeck>
        <Card className="col-sm-4 m-2">
          <Card.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label className="mb-0">氏名</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={fullName}
                  onChange={handleFullNameOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="roomNo">
                <Form.Label className="mb-0">部屋番号</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={roomNo}
                  onChange={handleRoomNoOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="parking">
                <Form.Label className="mb-0">駐車場番号</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={parkingLotNo}
                  onChange={handleParkingLotNoOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="transfer">
                <Form.Label className="mb-0">金額</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={transferAmount}
                  onChange={handleTransferAmountOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="transfer">
                <Form.Label className="mb-0">支払済月</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={transferSatisfiedMonth}
                  onChange={handleTransferAmountOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="company">
                <Form.Label className="mb-0">保証会社</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={guaranteeCompany}
                  onChange={handleGuaranteeCompanyOnChange}
                  readOnly={readonly}
                  plaintext={readonly}
                  className="text-secondary pt-0"
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label className="mb-0">物件</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={apartmentName}
                  readOnly
                  plaintext
                  className="text-secondary pt-0"
                />
              </Form.Group>
            </Form>
            {buttonVisible ? (
              <Button variant="outline-primary" onClick={handleShow}>
                変更
              </Button>
            ) : (
              <>
                <Button variant="outline-success" onClick={handleSave}>
                  保存
                </Button>
                <Button variant="outline-secondary" onClick={handleCancel}>
                  キャンセル
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
        <Card className="col-sm-8 m-2">
          <Card.Body>
            <Card.Title className="mb-3 d-flex flex-row">
              <h3 className="col-sm-11">支払い状況</h3>
              <Button
                variant="light"
                className="float-right"
                onClick={handleTransferAddOpen}
              >
                <FaPlus />
              </Button>
            </Card.Title>
            <div className="fixed-table">
              <Table hover>
                <thead>
                  <tr>
                    <th>支払い金額</th>
                    <th>支払日</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{transfer}</tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </CardDeck>
      <CustomToast
        message={toastMessage}
        show={showtoast}
        setShow={setShowToast}
      />
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Body className="text-danger">
          入居者情報を削除しますか？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            キャンセル
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={transModalShow} onHide={handleTransModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>入金</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>振込日</Form.Label>
            <Form.Control type="date" onChange={handleNewTDataOnChange} />
            <Form.Label>振込金額</Form.Label>
            <Form.Control type="number" onChange={handleNewTAmountOnChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleTransferAdd}>
            保存
          </Button>
          <Button variant="secondary" onClick={handleTransModalClose}>
            キャンセル
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResidentPage;
