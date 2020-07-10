import * as React from "react";

import { Button, Modal, Form } from "semantic-ui-react";

export interface IModalDialogProps {
  modalOpen: boolean;
  header: string;
  cancelAction: () => void;
  confirmAction: () => void;
  confirmText?: string;
  cancelText?: string;
<<<<<<< HEAD
=======
  error?: boolean;
>>>>>>> 29845570e23a9a4b2211180730f51d7b0f6f9ebc
}

const ModalDialog: React.FC<IModalDialogProps> = ({
  modalOpen,
  header,
  cancelAction,
  confirmAction,
  confirmText,
  cancelText,
  children,
}) => {
  return (
    <Modal
      as={Form}
      open={modalOpen}
      closeOnEscape={true}
      closeOnDimmerClick={true}
      onClose={cancelAction}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button onClick={cancelAction}>{cancelText}</Button>
        <Button color="blue" onClick={confirmAction}>
          {confirmText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ModalDialog;