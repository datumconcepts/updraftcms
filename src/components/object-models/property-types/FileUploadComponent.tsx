import * as React from "react";
import { Icon,  Card, Form } from 'semantic-ui-react';



import { IDocumentProperty, IPropertyMap } from 'models'



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
    return (<Card fluid={true}>
      <Card.Content>
        <Card.Header onClick={this.handleExpandClick}>
          {propertyMap.name}
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
