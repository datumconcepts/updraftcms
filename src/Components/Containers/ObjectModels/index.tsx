// tslint:disable:jsx-no-lambda
/* tslint:disable */
import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { AppActionsCreators } from 'src/Store/ActionCreators';
import { IAppState, IObjectModelState } from 'src/Store/State';

import ObjectModelEdit from "../../Presentation/ObjectModels/ObjectModelEdit";
import ObjectModelList from "../../Presentation/ObjectModels/ObjectModelList";
import { defaultObjectModel } from 'src/Store/State/IObjectModel';


type IObjectModelContainerProps = IObjectModelState & typeof AppActionsCreators.ObjectModel

class ObjectModelContainer extends React.Component<
  IObjectModelContainerProps,
  {}
  > {

  public componentDidMount() {
    this.props.requestObjectModels();
  }

  public render() {
    const { objectModels } = this.props;
    return (
      <React.Fragment>
        <Route
          path="/object-models"
          exact={true}
          render={renderProps => {
            return <ObjectModelList objectModels={[...objectModels.values()]} />
          }}
        />
        <Route
          path="/object-models/edit/:id"
          render={renderProps => {
            const id = renderProps.match.params.id;
            return <ObjectModelEdit onValueChange={this.props.modifyObjectModel}
              objectModel={objectModels.get(id) || { ...defaultObjectModel, id }} />
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect((state: IAppState) => {
  return { ...state.objectModel }
}, {
    ...AppActionsCreators.ObjectModel
  })(ObjectModelContainer);
