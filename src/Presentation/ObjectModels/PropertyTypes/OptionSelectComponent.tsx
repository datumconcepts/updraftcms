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
    return (
      <Card square={true}>
        <Card.Content extra={true}>
          <Select fullWidth={true} label={propertyMap.name} options={[]} />

          <Button icon={true}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <Icon name="expand" />
          </Button>
        </Card.Content>
        <Accordion in={this.state.expanded}>
          <Accordion.Content>
            <Grid container={true} spacing={10}>
              <Grid item={true} xs={true}>
                <Form.Field
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={this.changeValue}
                  value={propertyMap.name}
                />
              </Grid>
              <Grid item={true} xs={true}>
                <Form.Field
                  label="Id"
                  fullWidth={true}
                  disabled={true}
                  value={propertyMap.id}
                />
              </Grid>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Card>
    );
  }
}
export default OptionSelectComponent;
