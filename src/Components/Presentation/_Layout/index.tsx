import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from '@material-ui/core/IconButton';
import WidgetsIcon from '@material-ui/icons/Widgets';

import { Link, LinkProps, RouteComponentProps, withRouter } from 'react-router-dom';


import { withStyles, WithStyles } from "@material-ui/core/styles";

import styles from "./styles";

const ObjectModelLink = (props: LinkProps) => <Link to="/object-models"  {...props}/>

interface ILayoutState {
  open: boolean;
}

interface ILayoutProps extends RouteComponentProps, WithStyles<typeof styles>   {
  authState?: string;
  classes: any;
}

class Layout extends React.Component<ILayoutProps, ILayoutState, {}> {
  public state: ILayoutState = {
    open: false
  };

  public handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  public handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" elevation={0} className={classes.appBar}>
          <Toolbar variant="dense" />
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} >
          <Toolbar variant="dense" />
        <IconButton aria-label="Object Models" color="primary" component={ObjectModelLink}>
          <WidgetsIcon />
        </IconButton>
        </Drawer>
        <main className={classes.content}>
          <Toolbar variant="dense"/>
          {children}
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(withRouter(Layout));
