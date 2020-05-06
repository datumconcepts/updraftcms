import * as React from "react";

import { IObjectModel, FormErrors } from "models";
import { Form } from "semantic-ui-react";
import AppContent from "components/high-order/AppContent";

export interface IGeneralSettingsTabProps {
  objectModel: IObjectModel;
  errors: FormErrors;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}

export interface IGeneralSettingsTabState {
  objectModel: IObjectModel;
  errors: FormErrors;
}
const GeneralSettingsTab: React.FC<IGeneralSettingsTabProps> = ({
  objectModel,
  errors,
  onPropertyUpdate,
}) => {
  const valueChangeHandler = (e: any) => {
    const { name, value } = e.target;
    onPropertyUpdate({ ...objectModel, [name]: value });
  };

  return (
    <AppContent>
      <Form>
        <Form.Input
          onChange={valueChangeHandler}
          fluid={true}
          name="name"
          value={objectModel.name}
          label="Object Model Name"
          required
          error={errors["name"]}
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
          onChange={valueChangeHandler}
          value={objectModel.description}
          rows={5}
        />
      </Form>
    </AppContent>
  );
};
export default GeneralSettingsTab;
