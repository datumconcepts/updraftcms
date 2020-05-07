import * as React from "react";
import { Menu, Breadcrumb, Icon, Confirm } from "semantic-ui-react";
import PageToolbar from "components/high-order/PageToolbar";

interface IObjectModelEditToolbarProps {
  cloneObjectModel: () => void;
  saveObjectModel: () => void;
  deleteObjectModel: () => void;
  closeObjectModel: () => void;
  isNew: boolean;
  dirty: boolean;
}

interface IObjectModelEditToolbarState {
  closeOpen: boolean;
}

class ObjectModelEditToolbar extends React.Component<
  IObjectModelEditToolbarProps,
  IObjectModelEditToolbarState
> {
  public state = {
    closeOpen: false,
  };

  public showClose = () => {
    if (this.props.dirty) {
    this.setState({ closeOpen: true });
    }
  };

  public handleCloseCancel = () => {
    this.setState({ closeOpen: false });
  };

  public handleCloseConfirm = () => {
    this.setState({ closeOpen: false });
    this.props.closeObjectModel();
  };

  public render() {
    const {
      cloneObjectModel,
      saveObjectModel,
      deleteObjectModel,
      closeObjectModel,
      isNew,
      dirty
    } = this.props;
    const state = this.state;
    return (
      <PageToolbar>
        <Menu.Item>
          <Breadcrumb.Section>Object Models</Breadcrumb.Section>
          <Breadcrumb.Divider
            icon={{ name: "angle right" }}
          ></Breadcrumb.Divider>
          <Breadcrumb.Section>Edit</Breadcrumb.Section>
        </Menu.Item>
        <Menu.Menu position="right">
          {!isNew && (
            <Menu.Item icon={true} onClick={cloneObjectModel}>
              <Icon name="copy outline" color="blue" />
            </Menu.Item>
          )}
          <Menu.Item icon={true} onClick={saveObjectModel}>
            <Icon name="save" color="blue" />
          </Menu.Item>
          {!isNew && (
            <Menu.Item onClick={deleteObjectModel}>
              <Icon name="trash alternate outline" color="red" />
            </Menu.Item>
          )}
          <Menu.Item icon={true} onClick={this.showClose}>
            <Icon name="close" />
            <Confirm
              open={state.closeOpen}
              content="This is a custom message"
              onCancel={this.handleCloseCancel}
              // onConfirm={closeObjectModel}
              onConfirm={this.handleCloseConfirm}
            />
          </Menu.Item>
        </Menu.Menu>
      </PageToolbar>
    );
  }
}

export default ObjectModelEditToolbar;
