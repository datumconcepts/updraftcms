import * as React from "react";



import AppContent from "Presentation/HOC/AppContent";

import { IObjectModel } from "Types";
import { Grid, Form } from 'semantic-ui-react';



export interface IGeneralSettingsTabProps {
  objectModel: IObjectModel;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}

export interface IGeneralSettingsTabState {
  objectModel: IObjectModel;
}

class GeneralSettingsTab extends React.Component<
  IGeneralSettingsTabProps,
  IGeneralSettingsTabState
  > {
  public state = {
    objectModel: this.props.objectModel
  };

  public valueChangeHandler = (e: any) => {
    const { name, value } = e.target;
    this.props.onPropertyUpdate({ ...this.props.objectModel, [name]: value });
  };

  public render() {
    const { objectModel } = this.props;
    return (
      <AppContent>
        <Form>
          <Form.Input
            onChange={this.valueChangeHandler}
            fluid={true}
            name="name"
            value={objectModel.name}
            label="Object Model Name"
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
            onChange={this.valueChangeHandler}
            value={objectModel.description}
            rows={5}
          />
        </Form>
      </AppContent>
    );
  }
}
export default GeneralSettingsTab;
