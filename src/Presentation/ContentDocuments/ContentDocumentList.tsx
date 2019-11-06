import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";


import AddIcon from '@material-ui/icons/Add';

import { IContentDocument, IObjectModel, } from "src/Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import styles from "./ListStyles";

import * as guid from "uuid/v4";
import ContentDocumentMenu from './ContentDocumentMenu';


interface IRouteParams {
  objectModelId?: string;
}
interface IContentDocumentListProps extends RouteComponentProps<IRouteParams>, WithStyles<typeof styles> {
  objectModels: IObjectModel[];
  contentDocuments: IContentDocument[];
}
class ContentDocumentList extends React.Component<IContentDocumentListProps> {

  public addContentDocument = (event: any) => {
    const { contentDocuments, history, match: { params } } = this.props;
    let id = guid().replace(/-/g, "");
    while (contentDocuments.find(model => model.id === id)) {
      id = guid().replace(/-/g, "");
    }
    history.push(params.objectModelId ? `/${params.objectModelId}/content/edit/${id}` : `/content/edit/${id}`);
  }

  public editContentDocument = (contentDocument: IContentDocument) => {
    const { id, objectModelId } = contentDocument;
    this.props.history.push(objectModelId ? `/${objectModelId}/content/edit/${id}` : `/content/edit/${id}`);
  }

  public render() {
    const { contentDocuments, objectModels, classes } = this.props;
    return (
      <React.Fragment>
        <AppContent>
          <ContentDocumentMenu objectModels={objectModels} />
          {contentDocuments.length === 0 ? (
            <EmptyListDisplay
              clickHandler={this.addContentDocument}
              title="It looks like you have no content yet. Click here to add a new document"
            />
          ) : (
              <Grid direction="column" container={true} spacing={10}>
                {([] as IContentDocument[])
                  .concat(contentDocuments)
                  .map((contentDocument, contentDocumentIndex) => (
                    <DisplayCard key={`content_document_${contentDocumentIndex}`}
                      title={contentDocument.name}
                      subHeader={contentDocument.id}
                      clickAction={() => this.editContentDocument(contentDocument)}
                      avatar={
                        <Avatar aria-label="Recipe">
                          R
                        </Avatar>
                      }
                    />
                  ))
                }
                <Fab color="primary" size="medium" aria-label="Add" className={classes.fab} onClick={this.addContentDocument} >
                  <AddIcon />
                </Fab>
              </Grid>
            )}
        </AppContent>
      </React.Fragment>
    );
  }
}

const routedContentDocumentList = withRouter(ContentDocumentList);
export default withStyles(styles, { withTheme: true })(routedContentDocumentList);
