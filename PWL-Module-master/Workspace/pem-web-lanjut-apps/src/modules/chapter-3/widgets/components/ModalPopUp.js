import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ButtonPrimary, ButtonSecondary } from "./ButtonUI";

const states = {
  setState: null,
  changeState(data) {
    if (!this.setState) return;
    this.setState((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  },
};

const handleClose = () => {
  states.changeState({
    open: false,
  });
};

const ModalPopUp = () => {
  const [data, setData] = useState({
    open: false,
    header: "ini header default",
    message: "ini message default",
    size: "md",
    footer: "",
    onClose: handleClose,
  });

  states.setState = setData;

  return (
    <Modal show={data.open} onHide={data.onClose} size={data.size}>
      <Modal.Header closeButton>
        <h3 className="modal-title">{data.header}</h3>
      </Modal.Header>
      <Modal.Body>{data.message}</Modal.Body>
      {(data.footer) ? (
        <Modal.Footer>
          <button onClick={data.onClose} className="btn btn-secondary px-10" >No</button>
          {data.footer}
        </Modal.Footer>
      ) : ''}
    </Modal>
  );
};

const openModal = ({ open = true, message, header, size, footer, onClose = () => { } }) => {
  states.changeState({
    message,
    header,
    size,
    open,
    footer,
    onClose: () => {
      onClose();
      handleClose();
    },
  });
};

const MessageConfirm = ({HandlerSubmit}) => {
  return (
    <div className="text-center">
      <h3 className="mb-10">Delete message ?</h3>
      <ButtonSecondary items={{
        title: "Cancel",
        btn_class: "btn-light me-5",
        type: "button",
      }} actions={()=>openModal({open:false})} >
        Cancel
      </ButtonSecondary>
      <ButtonPrimary items={{
        title: "Delete",
        btn_class: "btn-danger",
        type: "button",
      }} actions={()=>HandlerSubmit()} >
        Delete
      </ButtonPrimary>
    </div>
  )
}

export default ModalPopUp;
export { openModal, MessageConfirm };
