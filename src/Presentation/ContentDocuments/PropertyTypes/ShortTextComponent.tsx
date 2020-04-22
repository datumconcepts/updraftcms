import * as React from "react";


import { IDocumentProperty, IPropertyMap } from "Types";
import { Grid, Card, Form } from 'semantic-ui-react';

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
          <Card.Content>
            <Form.Field
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

          </Card.Content>
        </Card>
      </Grid>
    );
  }
}
export default ShortTextComponent;
