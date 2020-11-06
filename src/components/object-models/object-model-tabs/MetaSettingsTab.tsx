import * as React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Grid, Segment, List, Divider, Form } from 'semantic-ui-react';

import id from "uuid/v4";

import { IObjectModel, IPropertyMap } from 'models';

import ShortTextComponent from "../property-types/ShortTextComponent";
import LongTextComponent from "../property-types/LongTextComponent";
import AppContent from "components/high-order/AppContent";

const propertyTypes: any[] = [
  {
    name: "Short Text",
    required: false,
    propertyComponent: (onPropertyUpdate: any, propertyMap: any, deleteProperty: any) => (
      <ShortTextComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
        deleteProperty={deleteProperty}
      />
    ),
    propertyType: "textbox"
  },
  {
    name: "Long Text",
    required: false,
    propertyComponent: (onPropertyUpdate: any, propertyMap: any, deleteProperty: any) => (
      <LongTextComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
        deleteProperty={deleteProperty}
      />
    ),
    propertyType: "textarea"
  }
];

interface IMetaSettingsTabProps {
  objectModel: IObjectModel;
  onPropertyUpdate: (objectModel: IObjectModel) => void;
}


class MetaSettingsTab extends React.Component<
  IMetaSettingsTabProps
  > {

  public onDragEnd = (result: DropResult) => {
    const {
      objectModel: { metaProperties }
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

      metaProperties.splice(
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
      const [removed] = metaProperties.splice(startIndex, 1);
      metaProperties.splice(endIndex, 0, removed);
    }

    this.updateMetaProperties(
      metaProperties.map((x, i) => ({ ...x, sortOrder: i }))
    );
  };

  public valueChangeHandler = (metaProperty: IPropertyMap) => {
    const {
      objectModel: { metaProperties }
    } = this.props;
    this.updateMetaProperties([
      ...metaProperties.filter(x => x.id !== metaProperty.id),
      metaProperty
    ].sort((a, b) => a.sortOrder - b.sortOrder));
  };

  public updateMetaProperties = (metaProperties: IPropertyMap[]) => {
    this.props.onPropertyUpdate({ ...this.props.objectModel, 'metaProperties': metaProperties });
  };

  public deleteProperty = (metaProperty: IPropertyMap) => {
    const { metaProperties } = this.props.objectModel;
    this.updateMetaProperties(
      [...metaProperties.filter((x) => x.id !== metaProperty.id)]
    );
  };

  public render() {
    const {
      objectModel: { metaProperties }
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
                      {metaProperties.map((propItem, propKey) => (
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
                                  propItem,
                                  this.deleteProperty
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

export default MetaSettingsTab;
