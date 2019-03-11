import * as React from "react";

// import { Editor, EditorState } from "draft-js";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IPropertyMap } from "../../../../Types";

interface ITextboxComponentProps {
  propertyMap: IPropertyMap;
}

class RichTextComponent extends React.Component<ITextboxComponentProps> {
  public render() {
    const { propertyMap } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <TextField
            multiline={true}
            rows={5}
            fullWidth={true}
            placeholder="Enter default value"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container={true} spacing={24}>
            <Grid item={true} xs={true}>
              <TextField
                label="Name"
                fullWidth={true}
                value={propertyMap.name}
              />
            </Grid>
            <Grid item={true} xs={true}>
              <TextField
                label="Id"
                fullWidth={true}
                disabled={true}
                value={propertyMap.id}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default RichTextComponent;
