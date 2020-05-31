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

  const [name, setName] = React.useState("");

  const [required, setRequired] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeValue = (e: any) => {
    const {
      target: { name, value },
    } = e;
    onPropertyUpdate({ ...propertyMap, [name]: value });
  };

  const editButtonHandler = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
  };

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
          onChange={changeValue}
        />
        <Checkbox label="Required" onChange={changeValue} checked={required} />
      </ModalDialog>
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>
            <Grid columns="equal">
              <Grid.Column onClick={handleExpandClick}>
                {propertyMap.name}
              </Grid.Column>
              <Grid.Column style={{ flex: "0 0 auto", width: "auto" }}>
                <Icon
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
