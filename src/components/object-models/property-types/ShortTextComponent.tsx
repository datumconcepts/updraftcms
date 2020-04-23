import * as React from "react";
import { Card, Form } from 'semantic-ui-react';


import { IPropertyMap } from 'models';

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
      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={this.handleExpandClick}>
            {propertyMap.name}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form.Input fluid={true}
            name="defaultValue"
            onChange={this.changeValue}
            value={propertyMap.defaultValue}
            placeholder="Enter default value"
          />
        </Card.Content>
      </Card>
    );
  }
}
export default ShortTextComponent;