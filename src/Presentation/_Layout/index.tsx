import * as React from "react";


import { Link, LinkProps, RouteComponentProps, withRouter } from 'react-router-dom';
import { Menu, MenuItem, Icon, Sidebar, Segment, Popup } from 'semantic-ui-react';




const ObjectModelLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <Link innerRef={ref}  {...props} />);

interface ILayoutState {
  open: boolean;
}

interface ILayoutProps extends RouteComponentProps {
  authState?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {


  return (
    <>
      <Menu inverted={true} color="blue" fluid={true} attached="top" ></Menu>
      <Sidebar.Pushable as={Segment} attached={true}>
        <Sidebar as={Menu} inverted={true} icon="labeled" vertical={true} visible={true}>
          <Menu.Item aria-label="Object Models" as={ObjectModelLink} to="/object-models">
            <Icon  name="object group outline" size="large" fitted={true} />Models
          </Menu.Item>
            <Menu.Item icon={true} aria-label="Content" as={ObjectModelLink} to="/content">
              <Icon name="book" />Content
            </Menu.Item>
            <Menu.Item icon={true} aria-label="Media Library" as={ObjectModelLink} to="/media-library">
              <Icon name="images outline" />Media
            </Menu.Item>
        </Sidebar>
          <Sidebar.Pusher className="worksapace-pusher">
            {children}
          </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}
export default withRouter(Layout);
