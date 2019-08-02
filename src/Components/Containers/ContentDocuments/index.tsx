import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { AppActionsCreators } from 'src/Store/ActionCreators';
import { IAppState, IContentDocumentState } from 'src/Store/State';

import ContentDocumentEdit from 'src/Components/Presentation/ContentDocuments/ContentDocumentEdit';
import ContentDocumentList from "src/Components/Presentation/ContentDocuments/ContentDocumentList";

import { defaultContentDocument } from 'src/Store/State/IContentDocument';
import { IObjectModelState } from 'src/Store/State/IObjectModel';

type IContentDocumentContainerProps =
  IContentDocumentState &
  IObjectModelState &
  typeof AppActionsCreators.ContentDocument

class ContentDocumentContainer extends React.Component<IContentDocumentContainerProps, {}> {

  public render() {
    const { contentDocuments, objectModels } = this.props;
    return (
      <React.Fragment>
        <Route
          path="/content"
          exact={true}
          render={renderProps => {
            return <ContentDocumentList objectModels={[...objectModels.values()]}
              contentDocuments={[...contentDocuments.values()]} />
          }}
        />
        <Route
          path="/:objectModelId/content"
          exact={true}
          render={renderProps => {
            const objectModelId = renderProps.match.params.objectModelId;
            return <ContentDocumentList objectModels={[...objectModels.values()]}
              contentDocuments={([...contentDocuments.values()]).filter(doc => doc.objectModelId === objectModelId)} />
          }}
        />
        <Route
          path="/content/edit/:id"
          render={renderProps => {
            const id = renderProps.match.params.id;
            return <ContentDocumentEdit onValueChange={this.props.modifyContentDocument}
              contentDocument={contentDocuments.get(id) || { ...defaultContentDocument, id }}
              objectModels={objectModels}
              saveContentDocument={this.props.saveContentDocument}
              deleteContentDocument={this.props.deleteContentDocument} />
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect((state: IAppState) => {
  return { ...state.contentDocument, ...state.objectModel }
}, {
    ...AppActionsCreators.ContentDocument
  })(ContentDocumentContainer);
