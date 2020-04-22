import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { IAppState } from 'Store/State';
import { IObjectModelState } from './Store/State/IObjectModel';
import { IContentDocumentState } from './Store/State/IContentDocument';

import { AppActionsCreators } from 'Store/ActionCreators';

import ContentDocumentIndexContainer from 'Containers/ContentDocuments';
import MediaObjectIndexContainer from 'Containers/MediaObjects';
import ObjectModelIndexContainer from "Containers/ObjectModels";

type IAppRoutingProps =
  IObjectModelState &
  IContentDocumentState &
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
        /> <Route
          path="/media-library"
          render={renderProps => (
            <MediaObjectIndexContainer {...renderProps} {...this.props} />
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
