import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { IObjectModel } from "src/Types";

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

import styles from "./EditStyles";


import GeneralSettingsTab from "./ObjectModelTabs/GeneralSettingsTab";
import HtmlSettingsTab from "./ObjectModelTabs/HtmlSettingsTab";
import MetaSettingsTab from "./ObjectModelTabs/MetaSettingsTab";

interface IObjectModelEditProps extends RouteComponentProps, WithStyles<typeof styles> {
  objectModel: IObjectModel;
  onValueChange: (objectModel: IObjectModel) => void;
  saveObjectModel: (objectModel: IObjectModel) => void;
  deleteObjectModel: (id: string) => void;
}

interface IObjectModelEditState {
  activeTab: number;
  speedDialOpen: boolean;
}


class ObjectModelEdit extends React.Component<
  IObjectModelEditProps,
  IObjectModelEditState
  > {

  public state = {
    activeTab: 0,
    speedDialOpen: false
  };

  public componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts);
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts);
  }

  public registerShortcuts = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case 's':
          event.preventDefault();
          this.saveObjectModel(event);
          break;
        case 'd':
          event.preventDefault();
          this.deleteObjectModel(event);
          break;
        case 'q':
          event.preventDefault();
          this.closeObjectModel(event);
          break;
      }
    }
  }

  public handleTabChange = (event: React.ChangeEvent, activeTab: number) => {
    this.setState({ activeTab });
  };

  public saveObjectModel = (e: any) => {
    const { objectModel, history } = this.props;
    this.props.saveObjectModel(objectModel);
    history.push(`/object-models`);
  }
  public deleteObjectModel = (e: any) => {
    // Add event confirmation
    const { objectModel, history } = this.props;
    this.props.deleteObjectModel(objectModel.id);
    history.push(`/object-models`);
  }
  public closeObjectModel = (e: any) => {
    // Add event confirmation
    const { history } = this.props;
    history.push(`/object-models`);
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
    const { objectModel } = this.props;
    const { activeTab } = this.state;
    switch (activeTab) {
      case 0:
        return (
          <GeneralSettingsTab
            onPropertyUpdate={this.props.onValueChange}
            objectModel={objectModel}
          />
        );
      case 1:
        return (
          <HtmlSettingsTab
            onPropertyUpdate={this.props.onValueChange}
            objectModel={objectModel}
          />
        );
      case 2:
        return (
          <MetaSettingsTab
            onPropertyUpdate={this.props.onValueChange}
            objectModel={objectModel}
          />
        );
      default:
        return null;
    }
  };

  public render() {
    const { activeTab } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" color="default" elevation={1}>
          <Tabs value={activeTab} onChange={this.handleTabChange}>
            <Tab label="General Settings" />
            <Tab label="HTML Properties" />
            <Tab label="Meta Properties" />
            {/* <Tab label="Access Control List" /> */}
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
          <SpeedDialAction icon={<SaveIcon />} tooltipTitle={"Save [ ctrl + s ]"} onClick={this.saveObjectModel} />
          <SpeedDialAction icon={<DeleteIcon />} tooltipTitle={"Delete [ ctrl + d ]"} onClick={this.deleteObjectModel} />
          <SpeedDialAction icon={<CloseIcon />} tooltipTitle={"Close [ ctrl + q ]"} onClick={this.closeObjectModel} />
        </SpeedDial>

      </React.Fragment>
    );
  }
}
const routedObjectModelEdit = withRouter(ObjectModelEdit);
export default withStyles(styles, { withTheme: true })(routedObjectModelEdit);
