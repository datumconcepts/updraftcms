import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";


import { IObjectModel } from "Types";


import GeneralSettingsTab from "./ObjectModelTabs/GeneralSettingsTab";
import HtmlSettingsTab from "./ObjectModelTabs/HtmlSettingsTab";
import MetaSettingsTab from "./ObjectModelTabs/MetaSettingsTab";
import { Tab, TabProps } from 'semantic-ui-react';

interface IObjectModelEditProps extends RouteComponentProps {
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

  public handleTabChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, tab: TabProps) => {
    console.log(tab);
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


  public render() {
    const { objectModel } = this.props;
    return (<Tab menu={{ color: 'olive', inverted: true }}  panes={[
      {
        menuItem: 'General Settings',
        render: () => <GeneralSettingsTab
          onPropertyUpdate={this.props.onValueChange}
          objectModel={objectModel}
        />
      },
      {
        menuItem: 'Html Properties',
        render: () => <HtmlSettingsTab
          onPropertyUpdate={this.props.onValueChange}
          objectModel={objectModel}
        />
      },
      {
        menuItem: 'Meta Properties',
        render: () => <MetaSettingsTab
          onPropertyUpdate={this.props.onValueChange}
          objectModel={objectModel}
        />
      }
    ]} />);
  }
}
export default withRouter(ObjectModelEdit);
