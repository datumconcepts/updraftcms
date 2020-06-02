import * as React from "react";
import { Card, Form, Icon, Grid, Checkbox } from "semantic-ui-react";

import { IPropertyMap } from "models";

import ModalDialog from "components/high-order/modal-dialog/index";

interface ITextboxComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface ITextboxComponentState {
  expanded: boolean;
}

const ShortTextComponent: React.FC<ITextboxComponentProps> = ({
  propertyMap,
  onPropertyUpdate,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const [name, setName] = React.useState(propertyMap.name);

  const [required, setRequired] = React.useState(propertyMap.required);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeValue = (e: any) => {
    const {
      target: { name, value },
    } = e;
    onPropertyUpdate({ ...propertyMap, [name]: value });
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
        changeValue={changeValue}
        cancelAction={handleCancel}
        confirmAction={handleConfirm}
        confirmText="OK"
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
          <Form.Input
            fluid={true}
            name="defaultValue"
            onChange={changeValue}
            value={propertyMap.defaultValue}
            placeholder="Enter default value"
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default ShortTextComponent;
