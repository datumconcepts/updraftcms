import * as React from "react";
import { Card, Form, InputOnChangeData } from "semantic-ui-react";

import { IPropertyMap, IDocumentProperty } from "models";

interface ITextboxComponentProps {
  documentProperty: IDocumentProperty;
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}
interface ITextboxComponentState {
  expanded: boolean;
}

class ShortTextComponent extends React.Component<
  ITextboxComponentProps,
  ITextboxComponentState
> {
  public state = {
    expanded: false,
  };

  public handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  public changeValue = (e: any, { value }: InputOnChangeData) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    onPropertyUpdate({ ...documentProperty, value });
  };

  public render() {
    const { propertyMap, documentProperty } = this.props;
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={this.handleExpandClick}>
            {propertyMap.name}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form.Input
            required={propertyMap.required}
            fluid={true}
            name="value"
            onChange={this.changeValue}
            value={documentProperty.value}
            placeholder="Enter value"
          />
        </Card.Content>
      </Card>
    );
  }
}
export default ShortTextComponent;
