import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { IAppState } from 'src/Store/State';

import { AppActionsCreators } from 'src/Store/ActionCreators';

import ContentDocumentIndexContainer from './Components/Containers/ContentDocuments';
import ObjectModelIndexContainer from "./Components/Containers/ObjectModels";

type IAppRoutingProps = 
typeof AppActionsCreators.ContentDocument &
typeof AppActionsCreators.ObjectModel

class AppRouting extends React.Component<IAppRoutingProps, {}> {
  public componentDidMount() {
    this.props.requestObjectModels();
    this.props.requestContentDocuments();
  }

  public render() {
    return (
      <>
        <Route
          path="/object-models"
          render={renderProps => (
            <ObjectModelIndexContainer  {...renderProps} {...this.props} />
          )}
        />
        <Route
          path="/content"
          render={renderProps => (
            <ContentDocumentIndexContainer  {...renderProps} {...this.props} />
          )}
        />
        <Route
          path="/:objectmodelId/content"
          render={renderProps => (
            <ContentDocumentIndexContainer  {...renderProps} {...this.props} />
          )}
        />
      </>
    );
  }
}

export default connect((state: IAppState) => {
  return { ...state.contentDocument, ...state.objectModel }
}, {
    ...AppActionsCreators.ObjectModel,
    ...AppActionsCreators.ContentDocument
  })(AppRouting);
