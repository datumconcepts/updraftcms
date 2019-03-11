// tslint:disable:jsx-no-lambda
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { IObjectModel } from "src/Types";

import ObjectModelEdit from "../../Presentation/ObjectModels/ObjectModelEdit";
import ObjectModelList from "../../Presentation/ObjectModels/ObjectModelList";

// import * as id from "uuid/v4";

export interface IObjectModelContainerProps extends RouteComponentProps {
  objectModels: IObjectModel[];
}
export interface IObjectModelContainerState {
  objectModel: IObjectModel;
}

// This needs to be refactored to another file and exported - should it be on types? maybe default.
const defaultObjectModel = {
  description: "",
  htmlProperties: [],
  id: "",
  metaProperties: [],
  name: ""
} as IObjectModel;

class ObjectModelContainer extends React.Component<
  IObjectModelContainerProps,
  IObjectModelContainerState
  > {
  public state = {
    objectModel: defaultObjectModel
  };
  public componentDidMount() {
    const { location } = this.props;
    if (location.pathname === "/object-models/create") {
      this.setState({});
    }
  }


  public render() {
    const { objectModel } = this.state;
    return (
      <React.Fragment>
        <Route
          path="/object-models"
          exact={true}
          render={renderProps => (
            <ObjectModelList
              objectModels={[]}
              onCreateObjectModel={this.componentDidMount}
            />
          )}
        />
        <Route
          path="/object-models/create"
          render={renderProps => (
            <ObjectModelEdit
              onValueChange={this.componentDidMount}
              objectModel={objectModel}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ObjectModelContainer;
