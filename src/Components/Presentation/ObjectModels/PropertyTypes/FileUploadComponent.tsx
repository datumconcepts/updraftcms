import * as React from "react";


import { WithStyles, withStyles } from '@material-ui/core';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import FormControl from '@material-ui/core/FormControl'
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';


import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from "@material-ui/icons/Edit";


import { IDocumentProperty, IPropertyMap } from "src/Types";

import styles from '../EditStyles';


interface IFileUploadComponentProps extends WithStyles<typeof styles> {
  documentProperty: IDocumentProperty;
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}
interface IFileUploadComponentState {
  expanded: boolean;
}

class FileUploadComponent extends React.Component<
  IFileUploadComponentProps,
  IFileUploadComponentState
  > {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  public render() {
    const { classes, propertyMap } = this.props;
    return (
      <Grid item={true}>
        <Card square={true}>
          <CardActions>
            <FormControl fullWidth={true}>
              <InputLabel shrink={true}>{propertyMap.name}</InputLabel>
              <label className={classes.fileUpload}>
                <CloudUploadIcon color="disabled" />
              </label>
            </FormControl>
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card></Grid>
    );
  }
}
export default withStyles(styles, { withTheme: true })(FileUploadComponent);
