import * as React from "react";
import {
  Card,
  Select,
  Form,
  Icon,
  Grid,
  Checkbox,
  Button,
  Table,
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

  const [obj, setObj] = React.useState<IPropertyMap>({
    ...propertyMap,
    name: propertyMap.name,
    required: propertyMap.required,
    properties: propertyMap.properties ?? {
      multiple: false,
      options: [],
    },
  });


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const editButtonHandler = React.useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCancel = React.useCallback(() => {
    setModalOpen(false);
    setObj({
      ...propertyMap,
      name: propertyMap.name,
      required: propertyMap.required,
      properties: { ...propertyMap.properties },
    });
  }, [setModalOpen, setObj, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    onPropertyUpdate({
      ...propertyMap,
      name: obj.name,
      required: obj.required ?? false,
      properties: {
        multiple: obj.properties!.multiple,
        options: [...obj!.properties!.options!],
      },
    });
    setModalOpen(false);
  }, [obj, onPropertyUpdate, propertyMap, setModalOpen]);

  const addOption = React.useCallback(() => {
    let newArr = [...obj.properties!.options!];
    newArr.push({ text: "", value: "" });
    setObj({
      ...obj,
      properties: { ...obj.properties, options: newArr },
    });
  }, [obj]);

  const deleteOption = React.useCallback(
    (index) => {
      let newArr = [...obj.properties!.options!];
      newArr.splice(index, 1);
      setObj({
        ...obj,
        properties: { ...obj.properties, options: newArr },
      });
    },
    [obj]
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
          value={obj.name}
          onChange={(e, { value }) => setObj({ ...obj, name: value })}
        />
        <Checkbox
          label="Required"
          onChange={(e, { checked }) => setObj({ ...obj, required: checked! })}
          checked={obj.required}
        />
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={5} verticalAlign='middle'>Value</Table.HeaderCell>
              <Table.HeaderCell width={5} verticalAlign='middle'>Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <Button onClick={() => addOption()}>Add</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {obj.properties!.options!.map((option: any, index: any) => (
              <Table.Row key={index.toString()}>
                <Table.Cell>
                  <Input
                    style={{ width: "100%" }}
                    value={option.value}
                    onChange={(e, { value }) => {
                      let valueCopy = [...obj.properties!.options!];
                      valueCopy[index] = { ...valueCopy[index], value: value };
                      setObj({
                        ...obj,
                        properties: {
                          ...obj.properties,
                          options: valueCopy,
                        },
                      });
                    }}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    style={{ width: "100%" }}
                    value={option.text}
                    onChange={(e, { value }) => {
                      let textCopy = [...obj.properties!.options!];
                      textCopy[index] = {
                        ...textCopy[index],
                        text: value,
                      };
                      setObj({
                        ...obj,
                        properties: {
                          ...obj.properties,
                          options: textCopy,
                        },
                      });
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Button onClick={() => deleteOption(index)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Checkbox
          label="Multiple"
          onChange={(e, { checked }) =>
            setObj({
              ...obj,
              properties: {
                ...obj.properties,
                multiple: !obj.properties!.multiple,
              },
            })
          }
          checked={obj.properties!.multiple}
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
            closeOnChange
            openOnFocus
            closeOnBlur
            closeOnEscape
            fluid={true}
            label={propertyMap.name}
            multiple={propertyMap.properties?.multiple ?? false}
            options={propertyMap.properties?.options ?? []}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default OptionSelectComponent;
