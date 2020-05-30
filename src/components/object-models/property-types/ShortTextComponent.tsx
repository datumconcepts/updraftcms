import * as React from "react";
import { Card, Form, Icon, Grid } from "semantic-ui-react";

import { IPropertyMap } from "models";

import ModalDialog, {
  IModalDialogProps,
} from "components/high-order/modal-dialog/index";

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
  const [dialog, confirm] = React.useState<IModalDialogProps>();

  const [expanded, setExpanded] = React.useState(false);

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
    confirm({
      modalOpen: true,
      name: "",
      required: false,
      header: "Element Options",
      changeValue: changeValue,
      confirmText: "Save",
      confirmAction: handleConfirm,
      cancelText: "Discard",
      cancelAction: handleCancel,
    });
  };

  const handleCancel = () => {
    // confirm({...confirm, modalOpen: false})
  };

  const handleConfirm = () => {};

  return (
    <>
      {dialog && <ModalDialog {...dialog} />}

      {/* <ModalDialog
        name=""
        required={false}
        header="Element Options"
        changeValue={changeValue}
        cancelAction={handleCancel}
        confirmAction={handleConfirm}
        confirmText="OK"
        cancelText="Cancel"
      /> */}

      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={handleExpandClick}>
            <Grid columns="equal">
              <Grid.Column>{propertyMap.name}</Grid.Column>
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
