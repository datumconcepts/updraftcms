import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { IContentDocument, IObjectModel } from "src/Types";


import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';


import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';


import HtmlSettingsTab from './ContentDocumentTabs/HtmlSettingsTab';

import styles from "./EditStyles";



interface IRouteParams {
  objectModelId?: string;
  id: string;
}

interface IContentDocumentEditProps extends RouteComponentProps<IRouteParams>, WithStyles<typeof styles> {
  contentDocument: IContentDocument;
  objectModels: Map<string, IObjectModel>;
  onValueChange: (contentDocument: IContentDocument) => void;
  saveContentDocument: (contentDocument: IContentDocument) => void;
  deleteContentDocument: (id: string) => void;
}

interface IContentDocumentEditState {
  activeTab: number;
  speedDialOpen: boolean;
}

class ContentDocumentEdit extends React.Component<
  IContentDocumentEditProps,
  IContentDocumentEditState
  > {

  public state = {
    activeTab: 0,
    speedDialOpen: false,
  };

  public componentDidMount() {
    const { contentDocument: { objectModelId }, objectModels } = this.props;

    const objectModel = objectModels.get(objectModelId);
    if (objectModel) {
      this.loadObjectModel(objectModel);
    }
  }
  public componentDidUpdate(prevProps: IContentDocumentEditProps) {
    const { contentDocument: { objectModelId }, objectModels } = this.props;
    const { contentDocument: { objectModelId: prevObjectModelId } } = prevProps;
    console.log(prevObjectModelId, objectModelId);
    if (prevObjectModelId !== objectModelId) {
      const objectModel = objectModels.get(objectModelId);
      if (objectModel) {
        this.loadObjectModel(objectModel);
      }
    }
  }
  public handleTabChange = (event: React.ChangeEvent, activeTab: number) => {
    this.setState({ activeTab });
  };

  public saveContentDocument = (e: any) => {
    const { contentDocument, history, match: { params } } = this.props;
    this.props.saveContentDocument(contentDocument);
    history.push(params.objectModelId ? `/${params.objectModelId}/content` : `/content`);
  }
  public deleteContentDocument = (e: any) => {
    const { contentDocument, history, match: { params } } = this.props;
    this.props.deleteContentDocument(contentDocument.id);
    history.push(params.objectModelId ? `/${params.objectModelId}/content` : `/content`);
  }
  public closeContentDocument = (e: any) => {
    const { history, match: { params } } = this.props;
    history.push(params.objectModelId ? `/${params.objectModelId}/content` : `/content`);
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

  public renderTab = () => {
    const { contentDocument, objectModels, history, match: { params } } = this.props;
    const { activeTab } = this.state;
    switch (activeTab) {
      case 0:
        return (
          <HtmlSettingsTab
            onPropertyUpdate={this.props.onValueChange}
            contentDocument={contentDocument}
            objectModels={[...objectModels.values()]}
            onObjectModelChange={objectModelId => {
              history.push(`/${objectModelId}/content/edit/${params.id}`)
            }}
          />
        );
      default: return null
    }
  }

  public render() {
    const { activeTab } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" color="default" elevation={1}>
          <Tabs value={activeTab} onChange={this.handleTabChange}>
            <Tab label="HTML Properties" />
            <Tab label="Meta Properties" />
          </Tabs>
        </AppBar>
        {this.renderTab()}
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
          <SpeedDialAction icon={<CloseIcon />} tooltipTitle={"Close"} onClick={this.closeContentDocument} />
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
          (prop, index) =>
            ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )],
      metaProperties: [...contentDocument.metaProperties.filter(prop =>
        objectModel.metaProperties.find(template => template.id === prop.propertyMapId)),
      ...objectModel.metaProperties.filter(template =>
        !contentDocument.metaProperties.find(prop => template.id === prop.propertyMapId)).map(
          (prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
        )],
      objectModelId: objectModel.id
    });
  }
}

const routedContendDocumentEdit = withRouter(ContentDocumentEdit);
export default withStyles(styles, { withTheme: true })(routedContendDocumentEdit);
