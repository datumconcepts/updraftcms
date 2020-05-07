import * as React from "react";
import { Menu, Breadcrumb, Icon, Confirm } from "semantic-ui-react";
import PageToolbar from "components/high-order/PageToolbar";

interface IObjectModelEditToolbarProps {
  cloneObjectModel: () => void;
  saveObjectModel: () => void;
  deleteObjectModel: () => void;
  closeObjectModel: () => void;
  isNew: boolean;
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

  public handleCloseCancel = () => {
    this.setState((state) => ({ closeOpen: !state.closeOpen }));

  };

  public showClose = () => {
    this.setState({ closeOpen: true });
  };

  public handleCloseConfirm = () => {
    this.setState((state) => ({ closeOpen: !state.closeOpen }));
    this.props.closeObjectModel();
  };

  public render() {
    const {
      cloneObjectModel,
      saveObjectModel,
      deleteObjectModel,
      closeObjectModel,
      isNew,
    } = this.props;
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
              open={this.state.closeOpen}
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
