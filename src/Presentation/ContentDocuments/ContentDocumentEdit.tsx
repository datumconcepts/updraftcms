import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";


import { IContentDocument, IObjectModel } from "Types";



import HtmlSettingsTab from './ContentDocumentTabs/HtmlSettingsTab';
import MetaSettingsTab from './ContentDocumentTabs/MetaSettingsTab';

import { Tab } from 'semantic-ui-react';



interface IRouteParams {
  objectModelId?: string;
  id: string;
}

interface IContentDocumentEditProps extends RouteComponentProps<IRouteParams> {
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
          this.saveContentDocument(event);
          break;
        case 'd':
          event.preventDefault();
          this.deleteContentDocument(event);
          break;
        case 'q':
          event.preventDefault();
          this.closeContentDocument(event);
          break;
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
    // Add event confirmation
    const { contentDocument, history, match: { params } } = this.props;
    this.props.deleteContentDocument(contentDocument.id);
    history.push(params.objectModelId ? `/${params.objectModelId}/content` : `/content`);
  }
  public closeContentDocument = (e: any) => {
    // Add event confirmation
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

  public render() {
    const { contentDocument, objectModels, history, match: { params } } = this.props;
    const { activeTab } = this.state;
    return (
      <>
        <Tab menu={{ color: 'olive', inverted: true }} activeIndex={activeTab} panes={
          [
            {
              menuItem: 'Html Properties',
              pane: () => <HtmlSettingsTab
                onPropertyUpdate={this.props.onValueChange}
                contentDocument={contentDocument}
                objectModels={[...objectModels.values()]}
                onObjectModelChange={objectModelId => {
                  history.push(`/${objectModelId}/content/edit/${params.id}`)
                }}
              />
            },
            {
              menuItem: 'Meta Properties',
              pane: () => <MetaSettingsTab onPropertyUpdate={this.props.onValueChange} objectModels={[...objectModels.values()]} contentDocument={contentDocument} />

            }
          ]
        }></Tab>
        {/* <SpeedDial
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
      <SpeedDialAction icon={<SaveIcon />} tooltipTitle={"Save [ ctrl + s ]"} onClick={this.saveContentDocument} />
      <SpeedDialAction icon={<DeleteIcon />} tooltipTitle={"Delete [ ctrl + d ]"} onClick={this.deleteContentDocument} />
      <SpeedDialAction icon={<CloseIcon />} tooltipTitle={"Close [ ctrl + q ]"} onClick={this.closeContentDocument} />
    </SpeedDial> */}
      </>
    );
  }


}

export default withRouter(ContentDocumentEdit);
