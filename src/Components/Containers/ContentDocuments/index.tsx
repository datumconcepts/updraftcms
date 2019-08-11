import * as React from "react";
import { Route } from "react-router-dom";

import { AppActionsCreators } from 'src/Store/ActionCreators';
import { IContentDocumentState } from 'src/Store/State';

import ContentDocumentEdit from 'src/Components/Presentation/ContentDocuments/ContentDocumentEdit';
import ContentDocumentList from "src/Components/Presentation/ContentDocuments/ContentDocumentList";

import { defaultContentDocument } from 'src/Store/State/IContentDocument';
import { IObjectModelState } from 'src/Store/State/IObjectModel';
import { IContentDocument } from 'src/Types';

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
            return <ContentDocumentEdit
              onValueChange={this.props.modifyContentDocument}
              saveContentDocument={this.props.saveContentDocument}
              deleteContentDocument={this.props.deleteContentDocument}
              contentDocument={this.loadContentDocument(id)}
              objectModels={objectModels} />
          }}
        />
        <Route
          path="/:objectModelId/content/edit/:id"
          render={renderProps => {
            const id = renderProps.match.params.id;
            const objectModelId = renderProps.match.params.objectModelId;
            return <ContentDocumentEdit objectModels={objectModels}
              contentDocument={this.loadContentDocument(id, objectModelId)}
              deleteContentDocument={this.props.deleteContentDocument}
              saveContentDocument={this.props.saveContentDocument}
              onValueChange={this.props.modifyContentDocument} />
          }}
        />
      </React.Fragment>
    );
  }
  private loadContentDocument = (id: string, objectModelId?: string): IContentDocument => {
    const { contentDocuments, objectModels } = this.props;

    const contentDocument = contentDocuments.get(id) || { ...defaultContentDocument, id };
    if (!objectModelId) { return contentDocument; }

    const objectModel = objectModels.get(objectModelId)
    if (!objectModel) { return contentDocument; }

    return {
      ...contentDocument,
      htmlProperties: [...contentDocument.htmlProperties.filter(prop =>
        objectModel.htmlProperties.find(template => template.id === prop.propertyMapId)),
      ...objectModel.htmlProperties.filter(template =>
        !contentDocument.htmlProperties.find(prop => template.id === prop.propertyMapId)).map(
          (prop, index) =>
            ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )],
      metaProperties: [...contentDocument.metaProperties.filter(prop =>
        objectModel.metaProperties.find(template => template.id === prop.propertyMapId)),
      ...objectModel.metaProperties.filter(template =>
        !contentDocument.metaProperties.find(prop => template.id === prop.propertyMapId)).map(
          (prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )],
      objectModelId: objectModel.id
    };
  }
}

export default ContentDocumentContainer;
