import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IPropertyMap } from "../../../../Types";

interface ITextboxComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface ITextboxComponentState {
  expanded: boolean;
}

class ShortTextComponent extends React.Component<
  ITextboxComponentProps,
  ITextboxComponentState
> {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  public changeValue = (e:any) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate(Object.assign({}, propertyMap, { [name]: value }));
  };

  public render() {
    const { propertyMap } = this.props;
    return (
      <Card square={true}>
        <CardActions>
          <TextField
            fullWidth={true}
            name="defaultValue"
            onChange={this.changeValue}
            value={propertyMap.defaultValue}
            label={propertyMap.name}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Enter default value"
          />
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded}>
          <CardActions>
            <Grid container={true} spacing={10}>
              <Grid item={true} xs={true}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={this.changeValue}
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
          </CardActions>
        </Collapse>
      </Card>
    );
  }
}
export default ShortTextComponent;
