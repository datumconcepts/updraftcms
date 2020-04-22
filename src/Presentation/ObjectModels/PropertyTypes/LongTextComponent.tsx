import * as React from "react";


import { IPropertyMap } from "Types";
import { Card, Form, Button, Icon } from 'semantic-ui-react';

interface ILongTextComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface ILongTextComponentState {
  expanded: boolean;
}

class LongTextComponent extends React.Component<
  ILongTextComponentProps,
  ILongTextComponentState
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
    onPropertyUpdate({...propertyMap,  [name]: value });
  };

  public render() {
    const { propertyMap } = this.props;
    return (
      <Card square={true}>
        <Card.Content>
          <Form.Field
            fullWidth={true}
            multiline={true}
            rows={5}
            name="defaultValue"
            onChange={this.changeValue}
            value={propertyMap.defaultValue}
            label={propertyMap.name}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Enter default value"
          />
          <Button icon={true}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <Icon name="edit" />
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
export default LongTextComponent;
