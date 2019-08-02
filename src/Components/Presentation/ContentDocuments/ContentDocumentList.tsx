import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';


import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { IContentDocument, IObjectModel, } from "src/Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import styles from "./ListStyles";

import * as guid from "uuid/v4";
import ContentDocumentMenu from './ContentDocumentMenu';

interface IContentDocumentListProps extends RouteComponentProps, WithStyles<typeof styles> {
  objectModels: IObjectModel[];
  contentDocuments: IContentDocument[];
}
class ContentDocumentList extends React.Component<IContentDocumentListProps> {

  public addContentDocument = (event: any) => {
    const { contentDocuments, history } = this.props;
    let id = guid().replace(/-/g, "");
    while (contentDocuments.find(model => model.id === id)) {
      id = guid().replace(/-/g, "");
    }
    history.push(`/content/edit/${guid().replace(/-/g, "")}`);
  };
  public editContentDocument = (contentDocument: IContentDocument) => {
    const { history } = this.props;
    history.push(`/content/edit/${contentDocument.id}`);
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
                      title={"Content Document"}
                      subHeader={contentDocument.id}
                      avatar={
                        <Avatar aria-label="Recipe">
                          R
                        </Avatar>
                      }
                      headerAction={
                        <IconButton aria-label="Edit" onClick={() => this.editContentDocument(contentDocument)}>
                          <EditIcon />
                        </IconButton>
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
