import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


import { IDocumentProperty, IPropertyMap } from "src/Types";

interface ITextboxComponentProps {
  documentProperty: IDocumentProperty
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}

class ShortTextComponent extends React.Component<
  ITextboxComponentProps,
  {}
  > {

  public changeValue = (e: any) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate({ ...documentProperty, [name]: value });
  };

  public render() {
    const { documentProperty, propertyMap } = this.props;
    return (
      <Grid item={true}>
        <Card square={true}>
          <CardActions>
            <TextField
              fullWidth={true}
              name="value"
              onChange={this.changeValue}
              value={documentProperty.value}
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
