import * as React from "react";


import { Card, Form, Grid, Icon } from 'semantic-ui-react';


import { IDocumentProperty, IPropertyMap } from "Types";



interface ISingleFileComponentProps {
  documentProperty: IDocumentProperty;
  propertyMap: IPropertyMap;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
}
interface ISingleFileComponentState {
  expanded: boolean;
}

class SingleFileComponent extends React.Component<
  ISingleFileComponentProps,
  ISingleFileComponentState
  > {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (files) {
      this.handleFileUpload(files);
    }
  };

  public handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const { files } = e.dataTransfer;
    e.preventDefault();
    this.handleFileUpload(files);
  }

  public handleFileUpload = (files: FileList) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    const file = files.item(0);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (event: ProgressEvent) => {
        onPropertyUpdate({
          ...documentProperty, 'value': {
            content: fileReader.result,
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
          }
        });
      }
      fileReader.readAsDataURL(file);
    }
  }

  public handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }

  public render() {
    const { propertyMap } = this.props;
    return (
      <Grid item={true}>
        <Card square={true}>
          <Card.Content extra={true}>
            <Form.Field label={propertyMap.name}>
              <label className="file-upload" onDragOver={this.handleDragOver} onDrop={this.handleFileDrop}>
                <Icon name="cloud upload"  />
                <Form.Input type="file" name="value" onChange={this.changeValue} style={{ display: 'none' }} />
              </label>
            </Form.Field>
          </Card.Content>
        </Card></Grid>
    );
  }
}
export default SingleFileComponent;
