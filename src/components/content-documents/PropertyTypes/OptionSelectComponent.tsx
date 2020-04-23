import * as React from "react";



import { IPropertyMap, IDocumentProperty } from "Types";
import { Card, Select, Button, Icon, Accordion, Grid, Form, InputOnChangeData } from 'semantic-ui-react';

interface IOptionSelectComponentProps {
  documentProperty: IDocumentProperty
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
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

  public changeValue = (e: any, { value }: InputOnChangeData) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    onPropertyUpdate({ ...documentProperty, value });
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
