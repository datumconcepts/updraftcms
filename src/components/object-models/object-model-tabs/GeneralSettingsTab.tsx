import * as React from "react";

import { IObjectModel, FormErrors } from "models";
import { Form, StrictFormInputProps } from "semantic-ui-react";
import AppContent from "components/high-order/AppContent";

export interface IGeneralSettingsTabProps {
  objectModel: IObjectModel;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}

export interface IGeneralSettingsTabState {
  objectModel: IObjectModel;
  errors: FormErrors;
  // nameError?: StrictFormInputProps["error"];
}
const GeneralSettingsTab: React.FC<IGeneralSettingsTabProps> = ({ objectModel, onPropertyUpdate }) => {

  const [state, setState] = React.useState<IGeneralSettingsTabState>({ ...objectModel, errors });


  const nameChangeHandler = (e: any) => {
    const { name, value } = e.target;
    onPropertyUpdate({ ...objectModel, [name]: value });
    if (value === '') {
      setState({ objectModel, nameError: { content: 'Please enter a name', pointing: 'below' } });
    } else {
      setState({ objectModel, nameError: false });
    }
  };

  const descriptionChangeHandler = (e: any) => {
    const { name, value } = e.target;
    onPropertyUpdate({ ...objectModel, [name]: value });
  };

  return (
    <AppContent>
      <Form>
        <Form.Input
          onChange={nameChangeHandler}
          fluid={true}
          name="name"
          value={objectModel.name}
          label="Object Model Name"
          required
          error={state.nameError}
        />
        <Form.Input
          name="id"
          value={objectModel.id}
          disabled={true}
          label="Object Model Key"
        />
        <Form.TextArea
          label="Description"
          name="description"
          onChange={descriptionChangeHandler}
          value={objectModel.description}
          rows={5}
        />
      </Form>
    </AppContent>
  );
}
export default GeneralSettingsTab;
