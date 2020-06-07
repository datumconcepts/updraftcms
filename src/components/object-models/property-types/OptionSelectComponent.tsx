import * as React from "react";
import {
  Card,
  Select,
  Form,
  Icon,
  Grid,
  Checkbox,
  Button,
  List,
  Input,
} from "semantic-ui-react";

import { IPropertyMap } from "models";

import ModalDialog from "components/high-order/modal-dialog/index";

interface IOptionSelectComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}

const OptionSelectComponent: React.FC<IOptionSelectComponentProps> = ({
  propertyMap,
  onPropertyUpdate,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState(propertyMap.name);
  const [required, setRequired] = React.useState(propertyMap.required);
  const [properties, setProperties] = React.useState({
    multiple: false,
    options: [{ text: "display text", value: 1, edit: false }],
  });
  const [newOptionName, setNewOptionName] = React.useState("");
  // const [editOption, setEditOption] = React.useState(false);
  const [editOptionName, setEditOptionName] = React.useState("");

  if (typeof propertyMap.properties == "undefined") {
    propertyMap.properties = {
      multiple: false,
      options: [],
    };
  }

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
    setProperties(propertyMap.properties);
  }, [setModalOpen, setName, setRequired, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    onPropertyUpdate({
      ...propertyMap,
      name: name,
      required: required ?? false,
      properties: {
        multiple: properties.multiple,
        options: [...properties.options],
      },
    });
    setModalOpen(false);
  }, [onPropertyUpdate, propertyMap, name, required, properties, setModalOpen]);

  const addOption = React.useCallback(
    (name) => {
      setProperties({
        ...properties,
        options: [
          ...properties.options,
          { text: name, value: properties.options.length + 1, edit: false },
        ],
      });
      setNewOptionName("");
    },
    [setProperties, properties]
  );

  const handleEditOption = React.useCallback(
    (editOptionName, index) => {
      setProperties({...properties})
      setEditOptionName(editOptionName);
    },
    [setProperties, properties]
  );

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
        <List label="Options">
          {properties.options.map((option, index) => (
            <List.Item key={index.toString()}>
              <List.Content floated="right">
                <Button onClick={() => handleEditOption(editOptionName,index)}>
                  Edit
                </Button>
              </List.Content>
              <List.Content>
                {option.edit ? (
                  <Input
                    value={editOptionName}
                    onChange={(e, { value }) => setEditOptionName(value)}
                  />
                ) : (
                  option.text
                )}
              </List.Content>
            </List.Item>
          ))}
          <List.Item>
            <List.Content floated="right">
              <Button onClick={() => addOption(newOptionName)}>Add</Button>
            </List.Content>
            <List.Content>
              <Input
                value={newOptionName}
                onChange={(e, { value }) => setNewOptionName(value)}
              />
            </List.Content>
          </List.Item>
        </List>
        <Checkbox
          label="Multiple"
          onChange={(e, { checked }) =>
            setProperties({
              ...properties,
              multiple: !properties.multiple,
            })
          }
          checked={properties.multiple}
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
          <Select
            fluid={true}
            label={propertyMap.name}
            multiple={propertyMap.properties.multiple}
            options={propertyMap.properties.options}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default OptionSelectComponent;
