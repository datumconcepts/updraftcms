import * as React from "react";
import {
  Card,
  Form,
  Icon,
  Grid,
  Checkbox,
  Segment,
  Button,
} from "semantic-ui-react";

import { IPropertyMap } from "models";

import ModalDialog from "components/high-order/modal-dialog/index";

import ConfirmDialog, {
  IConfirmDialogProps,
} from "components/high-order/confirm-dialog";

interface IFileUploadComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}

const FileUploadComponent: React.FC<IFileUploadComponentProps> = ({
  propertyMap,
  onPropertyUpdate,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dialog, confirm] = React.useState<IConfirmDialogProps>();

  const [obj, setObj] = React.useState<IPropertyMap>({
    ...propertyMap,
    name: propertyMap.name,
    required: propertyMap.required,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const editButtonHandler = React.useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCancel = React.useCallback(() => {
    setModalOpen(false);
    setObj({ ...obj, name: propertyMap.name });
    setObj({ ...obj, required: propertyMap.required });
  }, [setModalOpen, setObj, obj, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    onPropertyUpdate({
      ...propertyMap,
      name: obj.name,
      required: obj.required ?? false,
    });
    setModalOpen(false);
  }, [onPropertyUpdate, propertyMap, obj, setModalOpen]);

  const deleteComponent = React.useCallback(() => {
    confirm(undefined);
    console.log("deleted "+propertyMap.name)
  }, [propertyMap]);

  const deleteButtonHandler = React.useCallback(() => {
    confirm({
      message: "Do you wish to delete " + propertyMap.name+"?",
      confirmText: "OK",
      confirmAction: deleteComponent,
      cancelText: "Cancel",
      cancelAction: () => {
        confirm(undefined);
      },
    });
  }, [deleteComponent, propertyMap]);

  return (
    <>
      <ModalDialog
        modalOpen={modalOpen}
        header="Element Options"
        cancelAction={handleCancel}
        confirmAction={handleConfirm}
        confirmText="Update"
        cancelText="Cancel"
      >
        <Form.Input
          label="Name"
          name="name"
          value={obj.name}
          onChange={(e, { value }) => setObj({ ...obj, name: value })}
        />
        <Checkbox
          label="Required"
          onChange={(e, { checked }) => setObj({ ...obj, required: checked! })}
          checked={obj.required}
        />
      </ModalDialog>

      {dialog && <ConfirmDialog {...dialog} />}

      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={handleExpandClick}>
            <Grid columns="equal">
              <Grid.Column>{propertyMap.name}</Grid.Column>
              <Grid.Column style={{ flex: "0 0 auto", width: "auto" }}>
                <Icon
                  style={{ cursor: "pointer" }}
                  name="edit outline"
                  color="blue"
                  onClick={editButtonHandler}
                />
                <Icon
                  style={{ cursor: "pointer" }}
                  name="trash alternate outline"
                  color="blue"
                  onClick={deleteButtonHandler}
                />
              </Grid.Column>
            </Grid>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Segment placeholder>
            <Button color="blue">Browse</Button>
          </Segment>
        </Card.Content>
      </Card>
    </>
  );
};

export default FileUploadComponent;
