import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { IObjectModel } from "../../../Types";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";


import styles from "./EditStyles";


import GeneralSettingsTab from "./ObjectModelTabs/GeneralSettingsTab";
import HtmlSettingsTab from "./ObjectModelTabs/HtmlSettingsTab";
import MetaSettingsTab from "./ObjectModelTabs/MetaSettingsTab";

interface IObjectModelEditProps extends WithStyles<typeof styles> {
  objectModel: IObjectModel;
  onValueChange: (objectModel: IObjectModel, name: string, value: any) => void;
}

interface IObjectModelEditState {
  activeTab: number;
}


class ObjectModelEdit extends React.Component<
  IObjectModelEditProps,
  IObjectModelEditState
  > {

  public state = {
    activeTab: 0
  };

  public handleTabChange = (event: React.ChangeEvent, activeTab: number) => {
    if (activeTab === 5) {
      event.preventDefault();
    } else {
      this.setState({ activeTab });
    }
  };
  
  public saveObjectModel = (e: any) => {
    e.preventDefault();
  }

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
            <Tab label="Access Control List" />
            <Tab className={classes.spacer} />
            <Tab label="Save" onClick={this.saveObjectModel} />
          </Tabs>
        </AppBar>
        {this.renderTab()}
      </React.Fragment>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ObjectModelEdit);
