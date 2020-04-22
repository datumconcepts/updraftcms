import * as React from "react";
import { Link} from 'react-router-dom';
import { Menu, Icon, Sidebar, Segment } from 'semantic-ui-react';



interface ILayoutProps {
  authState?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {


  return (
    <>
      <Menu inverted={true} color="blue" fluid={true} attached="top" ></Menu>
      <Sidebar.Pushable as={Segment} attached={true}>
        <Sidebar as={Menu} inverted={true} color="black" icon="labeled" vertical={true} visible={true}>
          <Menu.Item aria-label="Object Models" as={Link} to="/object-models">
            <Icon name="object group outline" size="large" fitted={true} />Models
          </Menu.Item>
          <Menu.Item icon={true} aria-label="Content" as={Link} to="/content">
            <Icon name="book" />Content
            </Menu.Item>
          <Menu.Item icon={true} aria-label="Media Library" as={Link} to="/media-library">
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
export default Layout;
