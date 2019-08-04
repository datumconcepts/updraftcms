import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { IObjectModel } from "../../../Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import styles from "./ListStyles";

import * as guid from "uuid/v4";

interface IObjectModelListProps extends RouteComponentProps, WithStyles<typeof styles> {
  objectModels: IObjectModel[];
}
class ObjectModelList extends React.Component<IObjectModelListProps> {

  public addObjectModel = (event: any) => {
    const { objectModels, history } = this.props;
    let id = guid().replace(/-/g, "");
    while (objectModels.find(model => model.id === id)) {
      id = guid().replace(/-/g, "");
    }
    history.push(`/object-models/edit/${guid().replace(/-/g, "")}`);
  };
  public editObjectModel = (objectModel: IObjectModel) => {
    const { history } = this.props;
    history.push(`/object-models/edit/${objectModel.id}`);
  }

  public render() {
    const { objectModels, classes } = this.props;
    return (
      <React.Fragment>
        <AppContent>
          {objectModels.length === 0 ? (
            <EmptyListDisplay
              clickHandler={this.addObjectModel}
              title="It looks like you have no object models yet. Click here to add a new one"
            />
          ) : (
              <Grid direction="column" container={true} spacing={10}>
                {([] as IObjectModel[])
                  .concat(objectModels)
                  .map((objectModel, objectModelIndex) => (
                    <DisplayCard key={`object_model_${objectModelIndex}`}
                      title={objectModel.name}
                      subHeader={objectModel.id}
                      clickAction={() => this.editObjectModel(objectModel)}
                      avatar={
                        <Avatar aria-label="Recipe">
                          R
                        </Avatar>
                      }
                    />
                  ))
                }
                <Fab color="primary" size="medium" aria-label="Add" className={classes.fab} onClick={this.addObjectModel} >
                  <AddIcon />
                </Fab>
              </Grid>
            )}
        </AppContent>
      </React.Fragment>
    );
  }
}

const routedObjectModelList = withRouter(ObjectModelList);
export default withStyles(styles, { withTheme: true })(routedObjectModelList);
