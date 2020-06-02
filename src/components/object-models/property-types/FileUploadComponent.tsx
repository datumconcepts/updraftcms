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
  const [name, setName] = React.useState(propertyMap.name);
  const [required, setRequired] = React.useState(propertyMap.required);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const editButtonHandler = React.useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCancel = React.useCallback(() => {
    setModalOpen(false);
    setName(propertyMap.name);
    setRequired(propertyMap.required);
  }, [setModalOpen, setName, setRequired, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    onPropertyUpdate({
      ...propertyMap,
      name: name,
      required: required ?? false,
    });
    setModalOpen(false);
  }, [onPropertyUpdate, propertyMap, name, required, setModalOpen]);

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
          value={name}
          onChange={(e, { value }) => setName(value)}
        />
        <Checkbox
          label="Required"
          onChange={(e, { checked }) => setRequired(checked!)}
          checked={required}
        />
      </ModalDialog>
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
