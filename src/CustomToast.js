/*
const [showtoast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState({
  message: "更新失敗",
  class: "text-error"
});
 <CustomToast
message={toastMessage}
show={showtoast}
setShow={setShowToast}
/> */
import React from "react";
import "./styles.scss";
import Toast from "react-bootstrap/Toast";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomToast = ({ message, show, setShow }) => {
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        top: 0,
        right: 0
      }}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>
        <p className={message.class}>{message.message}</p>
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
