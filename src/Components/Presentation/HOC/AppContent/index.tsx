import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import styles from "./styles";

export interface IAppContentProps extends WithStyles<typeof styles> {}

class AppContent extends React.Component<IAppContentProps> {
  public render() {
    const { children, classes } = this.props;
    return <div className={classes.content}>{children}</div>;
  }
}

export default withStyles(styles, { withTheme: true })(AppContent);
