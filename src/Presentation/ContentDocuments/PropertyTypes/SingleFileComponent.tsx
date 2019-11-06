import * as React from "react";


import { WithStyles, withStyles } from '@material-ui/core';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import FormControl from '@material-ui/core/FormControl'
import Grid from "@material-ui/core/Grid";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import CloudUploadIcon from '@material-ui/icons/CloudUpload';


import { IDocumentProperty, IPropertyMap } from "src/Types";

import styles from '../EditStyles';


interface ISingleFileComponentProps extends WithStyles<typeof styles> {
  documentProperty: IDocumentProperty;
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}
interface ISingleFileComponentState {
  expanded: boolean;
}

class SingleFileComponent extends React.Component<
  ISingleFileComponentProps,
  ISingleFileComponentState
  > {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (files) {
      this.handleFileUpload(files);
    }
  };

  public handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const { files } = e.dataTransfer;
    e.preventDefault();
    this.handleFileUpload(files);
  }

  public handleFileUpload = (files: FileList) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    const file = files.item(0);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (event: ProgressEvent) => {
        onPropertyUpdate({
          ...documentProperty, 'value': {
            content: fileReader.result,
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
          }
        });
      }
      fileReader.readAsDataURL(file);
    }
  }

  public handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }

  public render() {
    const { classes, propertyMap } = this.props;
    return (
      <Grid item={true}>
        <Card square={true}>
          <CardActions>
            <FormControl fullWidth={true}>
              <InputLabel shrink={true}>{propertyMap.name}</InputLabel>
              <label className={classes.fileUpload} onDragOver={this.handleDragOver} onDrop={this.handleFileDrop}>
                <CloudUploadIcon color="disabled" />
                <Input type="file" name="value" onChange={this.changeValue} style={{ display: 'none' }} />
              </label>
            </FormControl>
          </CardActions>
        </Card></Grid>
    );
  }
}
export default withStyles(styles, { withTheme: true })(SingleFileComponent);
