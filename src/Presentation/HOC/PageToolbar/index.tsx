import * as React from "react";
import { Menu } from 'semantic-ui-react';




const PageToolbar: React.FC = ({ children }) => {
  return <Menu inverted={true} color="black" attached={true}>
    {children}
  </Menu>;
}
export default PageToolbar;
