import { Modal, Button, Header, Icon } from "semantic-ui-react";
import React, { useState } from "react";
const ModalExampleModal: React.FC<{
  confirmDelete: any;
  buttonName: string;
  modalHeader: string;
  modalContent: string;
  productId: number;
}> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={
          <button className="btn btn-outline-danger waves-effect waves-light mx-2">
            {props.buttonName}
          </button>
        }
      >
        <h2 className="text-center text-white">{props.modalHeader}</h2>
        <Modal.Content>
          <p className="text-center">{props.modalContent}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              setOpen(false);
              props.confirmDelete(props.productId);
            }}
          >
            <Icon name="checkmark" onClick /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalExampleModal;
