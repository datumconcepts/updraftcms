import * as React from "react";

import { IObjectModel } from "models";
import { Form, StrictFormInputProps } from "semantic-ui-react";
import AppContent from "components/high-order/AppContent";

export interface IGeneralSettingsTabProps {
  objectModel: IObjectModel;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}

export interface IGeneralSettingsTabState {
  objectModel: IObjectModel;
  nameError?: StrictFormInputProps["error"];
}

class GeneralSettingsTab extends React.Component<
  IGeneralSettingsTabProps,
  IGeneralSettingsTabState
> {
  public state = {
    objectModel: this.props.objectModel,
    nameError: false,
  };

  public nameChangeHandler = (e: any) => {
    const { name, value } = e.target;
    this.props.onPropertyUpdate({ ...this.props.objectModel, [name]: value });
    if (value === '') {
      this.setState({ nameError: { content: 'Please enter a name', pointing: 'below' } });
    } else {
      this.setState({ nameError: false });
    }
  };

  public descriptionChangeHandler = (e: any) => {
    const { name, value } = e.target;
    this.props.onPropertyUpdate({ ...this.props.objectModel, [name]: value });
  };

  public render() {
    const { objectModel } = this.props;
    return (
      <AppContent>
        <Form>
          <Form.Input
            onChange={this.nameChangeHandler}
            fluid={true}
            name="name"
            value={objectModel.name}
            label="Object Model Name"
            required
            error={this.state.nameError}
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
            onChange={this.descriptionChangeHandler}
            value={objectModel.description}
            rows={5}
          />
        </Form>
      </AppContent>
    );
  }
}
export default GeneralSettingsTab;
