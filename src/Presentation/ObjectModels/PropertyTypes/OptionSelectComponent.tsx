import * as React from "react";



import { IPropertyMap } from "Types";
import { Card, Select, Button, Icon, Accordion, Grid, Form } from 'semantic-ui-react';

interface IOptionSelectComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface IOptionSelectComponentState {
  expanded: boolean;
}

class OptionSelectComponent extends React.Component<
  IOptionSelectComponentProps,
  IOptionSelectComponentState
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
    onPropertyUpdate(Object.assign({}, propertyMap, { [name]: value }));
  };

  public render() {
    const { propertyMap } = this.props;
    return (<Card fluid={true}>
      <Card.Content>
        <Card.Header onClick={this.handleExpandClick}>
          {propertyMap.name}
        </Card.Header>
      </Card.Content>
      <Card.Content>

        <Select fluid={true} label={propertyMap.name} options={[]} />
      </Card.Content>
    </Card>
    );
  }
}
export default OptionSelectComponent;
