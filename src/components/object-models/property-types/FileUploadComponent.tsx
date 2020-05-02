import * as React from "react";
import { Icon, Card, Form, Grid } from "semantic-ui-react";

import { IDocumentProperty, IPropertyMap } from "models";

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
    expanded: false,
  };

  public handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  public render() {
    const { propertyMap } = this.props;
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={this.handleExpandClick}>
            <Grid columns="equal">
              <Grid.Column>{propertyMap.name}</Grid.Column>
              <Grid.Column style={{ flex: "0 0 auto", width: "auto" }}>
                <Icon name="edit outline" color="blue" />
              </Grid.Column>
            </Grid>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form.Field label={propertyMap.name}>
            <label className="file-upload">
              <Icon name="cloud upload" />
            </label>
          </Form.Field>
        </Card.Content>
      </Card>
    );
  }
}
export default FileUploadComponent;
