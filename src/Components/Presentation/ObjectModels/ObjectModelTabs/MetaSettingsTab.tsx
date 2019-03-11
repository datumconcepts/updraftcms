import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import ImageIcon from "@material-ui/icons/Image";

import AppContent from "../../HOC/AppContent";

import LongTextComponent from "../PropertyTypes/LongTextComponent";
import ShortTextComponent from "../PropertyTypes/ShortTextComponent";

import * as id from "uuid/v4";

import { IObjectModel, IPropertyMap } from "../../../../Types";
import styles from "../EditStyles";

const propertyTypes: any[] = [
  {
    name: "Short Text",
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
    propertyComponent: (onPropertyUpdate: any, propertyMap: any) => (
      <LongTextComponent
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "textarea"
  }
];

interface IMetaSettingsTabProps extends WithStyles<typeof styles> {
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

    this.updateHtmlProperties(
      metaProperties.map((x, i) => ({ ...x, sortOrder: i }))
    );
  };

  public valueChangeHandler = (htmlProperty: IPropertyMap) => {
    const {
      objectModel: { htmlProperties }
    } = this.props;
    this.updateHtmlProperties([
      ...htmlProperties.filter(x => x.id !== htmlProperty.id),
      htmlProperty
    ]);
  };

  public updateHtmlProperties = (htmlProperties: IPropertyMap[]) => {
    const { objectModel, onPropertyUpdate } = this.props;
    onPropertyUpdate(
      Object.assign({}, objectModel, {
        htmlProperties
      })
    );
  };

  public render() {
    const { classes } = this.props;
    const {
      objectModel: { metaProperties }
    } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container={true} spacing={0} className={classes.workspace}>
          <Grid item={true} xs={true} container={true}>
            <AppContent>
              <Droppable droppableId="object_model_properties">
                {(dropProvider, dropSnapshot) => (
                  <div
                    ref={dropProvider.innerRef}
                    className={classes.propertyEditor}
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
            </AppContent>
          </Grid>
          <Grid item={true} xs={4}>
            <Paper className={classes.propertyList}>
              <List disablePadding={true}>
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
                              <ListItem>
                                <Avatar>
                                  <ImageIcon />
                                </Avatar>
                                <ListItemText
                                  primary={propType.name}
                                  secondary="Jan 9, 2014"
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {dropProvider.placeholder}
                    </div>
                  )}
                </Droppable>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MetaSettingsTab);
