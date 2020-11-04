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
  Message,
} from "semantic-ui-react";

import { IPropertyMap, FormErrors } from "models";

import ModalDialog from "components/high-order/modal-dialog/index";

import ConfirmDialog, {
  IConfirmDialogProps,
} from "components/high-order/confirm-dialog";

interface IOptionSelectComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}

const OptionSelectComponent: React.FC<IOptionSelectComponentProps> = ({
  propertyMap,
  onPropertyUpdate,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dialog, confirm] = React.useState<IConfirmDialogProps>();

  const [errors, updateErrors] = React.useState<FormErrors>({});

  const [emptyError, setEmptyError] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const [inputErrorArray, setInputErrorArray] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(true);

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
    let newArr = new Array(obj.properties!.options!.length).fill({
      value: false,
      text: false,
    });
    setInputErrorArray([...newArr]);
  }, [obj]);

  const handleCancel = React.useCallback(() => {
    setObj({
      ...obj,
      properties: { ...obj.properties, options: [] },
    });
    setModalOpen(false);
    setEmptyError(false);
    setInputError(false);
    setLoading(false);
    setObj({
      ...propertyMap,
      name: propertyMap.name,
      required: propertyMap.required,
      properties: {
        ...propertyMap.properties,
        options: [...(propertyMap.properties ?.options ?? [])],
      },
    });
  }, [obj, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    setLoading(true);
    setInputError(false);
    if (obj.name === "") {
      updateErrors({ ...errors, name: "Name is a mandatory field" });
    }

    if (obj.properties ?.options ?.length === 0 || !obj.properties ?.options) {
      setEmptyError(true);
      setEmptyError(true);
      setInputError(false);
      setLoading(false);
      return false;
    }
    let inputErrorReturn = false;
    let inputErrorCopy = [...inputErrorArray];
    for (const [index, option] of obj.properties ?.options ?.entries()) {
      if (option.value === "") {
        inputErrorCopy[index] = { ...inputErrorCopy[index], value: true };
        setInputErrorArray(inputErrorCopy);
        inputErrorReturn = true;
        setInputError(true);
      }
      if (option.text === "") {
        inputErrorCopy[index] = { ...inputErrorCopy[index], text: true };
        setInputErrorArray(inputErrorCopy);
        inputErrorReturn = true;
        setInputError(true);
      }
    }
    if (!inputErrorReturn && obj.name) {

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
      setEmptyError(false);
      setInputError(false);
      setLoading(false);
    } else {
      setLoading(false);
      return false;
    }
  }, [errors, inputErrorArray, obj, onPropertyUpdate, propertyMap]);

  const addOption = React.useCallback(() => {
    let newArr = [...obj.properties!.options!];
    newArr.push({ text: "", value: "" });
    setObj({
      ...obj,
      properties: { ...obj.properties, options: newArr },
    });
    setEmptyError(false);
    setInputErrorArray([...inputErrorArray, { value: false, text: false }]);
    setLoading(false);
  }, [obj, inputErrorArray]);

  const deleteOption = React.useCallback(
    (index) => {
      let newArr = [...obj.properties!.options!];
      newArr.splice(index, 1);
      setObj({
        ...obj,
        properties: { ...obj.properties, options: newArr },
      });
      let errorArr = [...inputErrorArray];
      errorArr.splice(index, 1);
      setInputErrorArray(errorArr);
      setInputError(false);
      for (const option of errorArr) {
        if (option.value || option.text) {
          setInputError(true);
        }
      }
      setLoading(false);
    },
    [obj, inputErrorArray]
  );

  const inputChangeHandler = React.useCallback(
    (e, { value }, index, field) => {
      let inputErrorCopy = [...inputErrorArray];
      inputErrorCopy[index] = {
        ...inputErrorCopy[index],
        [field]: false,
      };
      setInputErrorArray(inputErrorCopy);

      let fieldCopy = [...obj.properties!.options!];
      fieldCopy[index] = {
        ...fieldCopy[index],
        [field]: value,
      };

      setInputError(false);
      for (const option of inputErrorCopy) {
        if (option.value || option.text) {
          setInputError(true);
        }
      }

      setObj({
        ...obj,
        properties: {
          ...obj.properties,
          options: fieldCopy,
        },
      });
    },
    [inputErrorArray, obj]
  );

  const deleteComponent = React.useCallback(() => {
    confirm(undefined);
    console.log("deleted " + propertyMap.name)
  }, [propertyMap]);

  const deleteButtonHandler = React.useCallback(() => {
    confirm({
      message: "Do you wish to delete " + propertyMap.name + "?",
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
          onChange={(e, { value }) => {
            setObj({ ...obj, name: value });
            if (value !== "") {
              delete errors["name"];
            }
            updateErrors(errors);
          }}
          error={errors["name"]}
        />
        <Checkbox
          label="Required"
          onChange={(e, { checked }) => setObj({ ...obj, required: checked! })}
          checked={obj.required}
        />
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={5} verticalAlign="middle">
                Value
              </Table.HeaderCell>
              <Table.HeaderCell width={5} verticalAlign="middle">
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <Button
                  onClick={() => {
                    setLoading(true);
                    addOption();
                  }}
                >
                  Add
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {obj.properties!.options!.length > 0 && !loading
              ? obj.properties!.options!.map((option: any, index: any) => (
                <Table.Row key={index.toString()}>
                  <Table.Cell>
                    <Form.Input
                      error={inputErrorArray[index].value}
                      style={{ width: "100%" }}
                      value={option.value}
                      onChange={(e, { value }) =>
                        inputChangeHandler(e, { value }, index, "value")
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      error={inputErrorArray[index].text}
                      style={{ width: "100%" }}
                      value={option.text}
                      onChange={(e, { value }) =>
                        inputChangeHandler(e, { value }, index, "text")
                      }
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button
                      onClick={() => {
                        setLoading(true);
                        deleteOption(index);
                      }}
                    >

                      Delete
                      </Button>
                  </Table.Cell>
                </Table.Row>
              ))
              : null}
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
        <Message
          error
          visible={inputError}
          header="Action Forbidden"
          content="Fields cannot be empty"
        />
        <Message
          error
          visible={emptyError}
          header="Action Forbidden"
          content="Option Select cannot be empty"
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
          <Select
            open={active}
            onChange={() => setActive(!active)}
            onClick={() => setActive(!active)}
            onClose={() => setActive(false)}
            fluid={true}
            label={propertyMap.name}
            multiple={propertyMap.properties ?.multiple}
            options={propertyMap.properties ?.options ?? []}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default OptionSelectComponent;
