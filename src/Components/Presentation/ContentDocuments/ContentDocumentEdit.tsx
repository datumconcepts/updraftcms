import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { IContentDocument, IDocumentProperty, IObjectModel } from "src/Types";

import { defaultObjectModel } from 'src/Store/State/IObjectModel';

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';


import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Select from "react-select";

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import styles from "./EditStyles";

import AppContent from "src/Components/Presentation/HOC/AppContent";

import LongTextComponent from "./PropertyTypes/LongTextComponent";
import OptionSelectComponent from "./PropertyTypes/OptionSelectComponent";
import RichTextComponent from "./PropertyTypes/RichTextComponent";
import ShortTextComponent from "./PropertyTypes/ShortTextComponent";

interface IContentDocumentEditProps extends RouteComponentProps, WithStyles<typeof styles> {
  contentDocument: IContentDocument;
  objectModels: Map<string, IObjectModel>;
  onValueChange: (contentDocument: IContentDocument) => void;
  saveContentDocument: (contentDocument: IContentDocument) => void;
  deleteContentDocument: (id: string) => void;
}


const propertyTypes: any[] = [
  {
    name: "Short Text",
    propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: any) => (
      <ShortTextComponent key={key}
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "textbox"
  },
  {
    name: "Long Text",
    propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: any) => (
      <LongTextComponent key={key}
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "textarea"
  },
  {
    name: "Option Select",
    propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: any) => (
      <OptionSelectComponent key={key}
        onPropertyUpdate={onPropertyUpdate}
        propertyMap={propertyMap}
      />
    ),
    propertyType: "select"
  },
  {
    name: "Rich Text",
    propertyComponent: (key: string, onPropertyUpdate: any, documentProperty: IDocumentProperty) => (
      <RichTextComponent key={key}
        documentProperty={documentProperty}
        onPropertyUpdate={onPropertyUpdate}
      />
    ),
    propertyType: "draftjs"
  },
  {
    name: "Single File",
    propertyComponent: (key: string, props: any, propertyMap: any) => (
      <ShortTextComponent key={key} {...props} propertyMap={propertyMap} />
    ),
    propertyType: "file"
  },
  {
    name: "Multiple Files",
    propertyComponent: (key: string, props: any, propertyMap: any) => (
      <ShortTextComponent key={key} {...props} propertyMap={propertyMap} />
    ),
    propertyType: "multifile"
  }
];



interface IContendDocumentEditState {
  activeTab: number;
  speedDialOpen: boolean;
  objectModel: IObjectModel;
}

class ContendDocumentEdit extends React.Component<
  IContentDocumentEditProps,
  IContendDocumentEditState
  > {

  public state = {
    activeTab: 0,
    objectModel: defaultObjectModel,
    speedDialOpen: false,
  };

  public valueChangeHandler = (e: any) => {
    const { name, value } = e.target;
    this.props.onValueChange({ ...this.props.contentDocument, [name]: value });
  };
  public handleTabChange = (event: React.ChangeEvent, activeTab: number) => {
    this.setState({ activeTab });
  };
  public handleObjectModelChange = ({ value, label }: { value: string, label: string }) => {
    const { objectModels } = this.props;
    const objectModel = objectModels.get(value);
    if (objectModel) {
      this.setState({ objectModel }, () => {
        this.loadObjectModel(objectModel);
      })
    }
  }
  public saveContentDocument = (e: any) => {
    const { contentDocument, history } = this.props;
    this.props.saveContentDocument(contentDocument);
    history.push(`/content`);
  }
  public deleteContentDocument = (e: any) => {
    const { contentDocument, history } = this.props;
    this.props.deleteContentDocument(contentDocument.id);
    history.push(`/content`);
  }
  public handleClose = () => {
    this.setState({ speedDialOpen: false });
  };
  public handleOpen = () => {
    this.setState({ speedDialOpen: true });
  };
  public handleClick = () => {
    this.setState(state => ({
      speedDialOpen: !state.speedDialOpen,
    }));
  };

  public render() {
    const { activeTab, objectModel } = this.state;
    const { classes, contentDocument, objectModels } = this.props;
    console.log(contentDocument);
    return (
      <React.Fragment>
        <AppBar position="static" color="default" elevation={1}>
          <Tabs value={activeTab} onChange={this.handleTabChange}>
            <Tab label="HTML Properties" />
            <Tab label="Meta Properties" />
          </Tabs>
        </AppBar>
        <AppContent>
          <Grid direction="column" justify="flex-start" container={true} spacing={2}>
            <Grid item={true}>
              <TextField
                onChange={this.valueChangeHandler}
                fullWidth={true}
                name="name"
                value={contentDocument.name}
                label="Name"
              />
            </Grid>
            <Grid item={true}>
              <Select fullWidth={true} label="Object Model"
                options={[...objectModels.values()].map(objectModelOption => ({ value: objectModelOption.id, label: objectModelOption.name }))}
                onChange={this.handleObjectModelChange}
              />
            </Grid>
            {
              contentDocument.htmlProperties.map((docProp, docPropIndex) => {
                const propItem = objectModel.htmlProperties.find(prop => prop.id === docProp.propertyMapId);
                if (propItem) {
                  return propertyTypes
                    .find(
                      x => x.propertyType === propItem.propertyType
                    )
                    .propertyComponent(`doc_prop_html_${docPropIndex}`,
                      this.props.onValueChange,
                      docProp
                    )
                }
              })
            }
          </Grid>
        </AppContent>
        <SpeedDial
          ariaLabel="Object Model Options"
          className={classes.fab}
          icon={<SpeedDialIcon icon={<MoreVertIcon />} openIcon={<CloseIcon />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={this.state.speedDialOpen}
          direction="left"
        >
          <SpeedDialAction icon={<SaveIcon />} tooltipTitle={"Save"} onClick={this.saveContentDocument} />
          <SpeedDialAction icon={<DeleteIcon />} tooltipTitle={"Delete"} onClick={this.deleteContentDocument} />
        </SpeedDial>
      </React.Fragment>
    );
  }

  private loadObjectModel = (objectModel: IObjectModel) => {
    const { contentDocument } = this.props;
    this.props.onValueChange({
      ...contentDocument,
      htmlProperties: [...contentDocument.htmlProperties.filter(prop =>
        objectModel.htmlProperties.find(template => template.id === prop.propertyMapId)),
      ...objectModel.htmlProperties.filter(template =>
        !contentDocument.htmlProperties.find(prop => template.id === prop.propertyMapId)).map(
          (prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )],
      metaProperties: [...contentDocument.metaProperties.filter(prop =>
        objectModel.metaProperties.find(template => template.id === prop.propertyMapId)),
      ...objectModel.metaProperties.filter(template =>
        !contentDocument.metaProperties.find(prop => template.id === prop.propertyMapId)).map(
          (prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )]
    });
  }
}
const routedContendDocumentEdit = withRouter(ContendDocumentEdit);
export default withStyles(styles, { withTheme: true })(routedContendDocumentEdit);
