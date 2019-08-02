import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


import { IPropertyMap } from "src/Types";

interface ITextboxComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}

class ShortTextComponent extends React.Component<
  ITextboxComponentProps,
  {}
  > {

  public changeValue = (e: any) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate({ ...propertyMap, [name]: value });
  };

  public render() {
    const { propertyMap } = this.props;
    return (
      <Grid item={true}>
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

          </CardActions>
        </Card>
      </Grid>
    );
  }
}
export default ShortTextComponent;
