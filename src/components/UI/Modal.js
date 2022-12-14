import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const overlayElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        overlayElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement
      )}
    </div>
  );
};

export default Modal;
