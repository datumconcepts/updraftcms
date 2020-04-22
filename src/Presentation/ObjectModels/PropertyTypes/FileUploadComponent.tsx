import * as React from "react";



import { IDocumentProperty, IPropertyMap } from "Types";

import { Icon, Grid, Card, Form, Button } from 'semantic-ui-react';


interface IFileUploadComponentProps {
  documentProperty: IDocumentProperty;
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}
interface IFileUploadComponentState {
  expanded: boolean;
}

class FileUploadComponent extends React.Component<
  IFileUploadComponentProps,
  IFileUploadComponentState
  > {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  public render() {
    const { propertyMap } = this.props;
    return (
      <Grid item={true}>
        <Card square={true}>
          <Card.Content extra={true}>
            <Form.Field label={propertyMap.name}>
              <label className="file-upload">
                <Icon name="cloud upload" />
              </label>
            </Form.Field>
            <Button icon={true}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <Icon name="edit" />
            </Button>
          </Card.Content>
        </Card></Grid>
    );
  }
}
export default FileUploadComponent;
