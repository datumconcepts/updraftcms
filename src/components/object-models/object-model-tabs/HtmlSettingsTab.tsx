import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Grid, Segment, List, Divider, Form, } from 'semantic-ui-react';



import id from "uuid/v4";

import { IObjectModel, IPropertyMap } from 'models'
import ShortTextComponent from "../property-types/ShortTextComponent";
import LongTextComponent from "../property-types/LongTextComponent";
import OptionSelectComponent from "../property-types/OptionSelectComponent";
import RichTextComponent from "../property-types/RichTextComponent";
import FileUploadComponent from "../property-types/FileUploadComponent";
import AppContent from "components/high-order/AppContent";

const propertyTypes: any[] = [
  {
    name: "Short Text",
    required: false,
    propertyComponent: (onPropertyUpdate: any, propertyMap: any) => (
      <ShortTextComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "textbox"
  },
  {
    name: "Long Text",
    required: false,
    propertyComponent: (onPropertyUpdate: any, propertyMap: any) => (
      <LongTextComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "textarea"
  },
  {
    name: "Option Select",
    required: false,
    properites: {
      multiple: false,
      options: []
    },
    propertyComponent: (onPropertyUpdate: any, propertyMap: any) => (
      <OptionSelectComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "select"
  },
  {
    name: "Rich Text",
    required: false,
    propertyComponent: (onPropertyUpdate: any, propertyMap: any) => (
      <RichTextComponent
        propertyMap={propertyMap}
        onPropertyUpdate={onPropertyUpdate}
      />
    ),
    propertyType: "draftjs"
  },
  {
    name: "Attachment",
    required: false,
    propertyComponent: (props: any, propertyMap: any) => (
      <FileUploadComponent {...props} propertyMap={propertyMap} />
    ),
    propertyType: "file"
  }
];

interface IHtmlSettingsTabProps {
  objectModel: IObjectModel;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}

class HtmlSettingsTab extends React.Component<IHtmlSettingsTabProps> {
  public onDragEnd = (result: any) => {
    const {
      objectModel: { htmlProperties }
    } = this.props;

    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === "available_html_property_types") {
      const property = propertyTypes.find(
        x => x.propertyType === result.draggableId
      );
      if (!property) {
        return;
      }

      const index = result.destination.index;

      htmlProperties.splice(
        index,
        0,
        Object.assign({}, property, {
          id: id().replace(/-/g, ""),
          sortOrder: index
        })
      );
    } else {
      const {
        source: { index: startIndex },
        destination: { index: endIndex }
      } = result;
      const [removed] = htmlProperties.splice(startIndex, 1);
      htmlProperties.splice(endIndex, 0, removed);
    }

    this.updateHtmlProperties(
      htmlProperties.map((x, i) => ({ ...x, sortOrder: i }))
    );
  };

  public valueChangeHandler = (htmlProperty: IPropertyMap) => {
    const { htmlProperties } = this.props.objectModel;
    this.updateHtmlProperties([
      ...htmlProperties.filter(x => x.id !== htmlProperty.id),
      htmlProperty
    ].sort((a, b) => a.sortOrder - b.sortOrder));
  };

  public updateHtmlProperties = (htmlProperties: IPropertyMap[]) => {
    this.props.onPropertyUpdate({ ...this.props.objectModel, 'htmlProperties': htmlProperties });
  };

  public render() {
    const {
      objectModel: { htmlProperties }
    } = this.props;
    return (
      <AppContent>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid style={{ display: 'flex', flex: 1 }}>
            <Grid.Column stretched={true} width={13}>
              <Segment as={Form} attached={true}>
                <Droppable droppableId="object_model_properties">
                  {(dropProvider, dropSnapshot) => (
                    <div ref={dropProvider.innerRef}
                      className={"property-editor"}
                    >
                      {htmlProperties.map((propItem, propKey) => (
                        <Draggable
                          key={propItem.id}
                          draggableId={propItem.id}
                          index={propKey}
                        >
                          {(dragProvider, drapdropSnapshot) => (
                            <div
                              ref={dragProvider.innerRef}
                              {...dragProvider.draggableProps}
                              {...dragProvider.dragHandleProps}
                            >
                              {propertyTypes
                                .find(
                                  x => x.propertyType === propItem.propertyType
                                )
                                .propertyComponent(
                                  this.valueChangeHandler,
                                  propItem
                                )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {dropProvider.placeholder}
                    </div>
                  )}
                </Droppable>
              </Segment>
            </Grid.Column>
            <Grid.Column stretched={true} width={3}><Segment attached={true}>
              <List relaxed={true} celled={true}>
                <Droppable
                  isDropDisabled={true}
                  droppableId="available_html_property_types"
                >
                  {(dropProvider, dropSnapshot) => (
                    <div ref={dropProvider.innerRef}>
                      {propertyTypes.map((propType, typeKey) => (
                        <Draggable
                          key={propType.propertyType}
                          draggableId={propType.propertyType}
                          index={typeKey}
                        >
                          {(dragProvider, drapdropSnapshot) => (
                            <div
                              ref={dragProvider.innerRef}
                              {...dragProvider.draggableProps}
                              {...dragProvider.dragHandleProps}
                            >
                              <List.Item>
                                {propType.name}
                              </List.Item>
                              <Divider />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {dropProvider.placeholder}
                    </div>
                  )}
                </Droppable>
              </List></Segment>
            </Grid.Column>
          </Grid>
        </DragDropContext>
      </AppContent>
    );
  }
}

export default HtmlSettingsTab;
