import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import AppContent from "src/Components/Presentation/HOC/AppContent";

import { IObjectModel } from "src/Types";

import styles from "src/Components/Presentation/ObjectModels/EditStyles";

// import * as _ from "lodash";

export interface IGeneralSettingsTabProps extends WithStyles<typeof styles> {
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
    const { objectModel, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate(Object.assign({}, objectModel, { [name]: value }));
  };

  public render() {
    const { objectModel } = this.props;
    return (
      <AppContent>
        <div style={{ width: "100%" }}>
          <Grid direction="column" spacing={24} container={true}>
            <Grid item={true} xs={true}>
              <TextField
                onChange={this.valueChangeHandler}
                fullWidth={true}
                name="name"
                value={objectModel.name}
                label="Object Model Name"
              />
            </Grid>
            <Grid item={true} xs={true}>
              <TextField
                fullWidth={true}
                name="id"
                value={objectModel.id}
                disabled={true}
                label="Object Model Key"
              />
            </Grid>
            <Grid item={true} xs={true}>
              <TextField
                label="Description"
                fullWidth={true}
                name="description"
                onChange={this.valueChangeHandler}
                value={objectModel.description}
                multiline={true}
                rows={5}
              />
            </Grid>
          </Grid>
        </div>
      </AppContent>
    );
  }
}
export default withStyles(styles, { withTheme: true })(GeneralSettingsTab);
