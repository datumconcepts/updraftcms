import * as React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class PageToolbar extends React.Component<any> {
  public render() {
    // const { classes, children } = this.props;
    return <AppBar position="static" elevation={0} color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Page Title
      </Typography>
      </Toolbar>
    </AppBar>;
  }
}
export default PageToolbar;
