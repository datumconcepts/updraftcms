import * as React from "react";

import { Button, Modal, Form, Checkbox } from "semantic-ui-react";

export interface IModalDialogProps {
  modalOpen: boolean;
  name: string;
  required: boolean;
  header: string;
  changeValue: (e: any) => void;
  cancelAction: () => void;
  confirmAction: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ModalDialog: React.FC<IModalDialogProps> = ({
  modalOpen,
  name,
  required,
  header,
  changeValue,
  cancelAction,
  confirmAction,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal as={Form} open={modalOpen}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form.Input
          label="Name"
          name="name"
          value={name}
          onChange={changeValue}
        />
        <Checkbox label="Required" onChange={changeValue} checked={required} />
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={cancelAction}>
          {cancelText}
        </Button>
        <Button onClick={confirmAction}>{confirmText}</Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ModalDialog;
