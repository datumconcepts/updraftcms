import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import styles from "./styles";

import { Typography } from "@material-ui/core";

export interface IEmptyListDisplayProps extends WithStyles<typeof styles> {
  clickHandler: (event: any) => void;
  title: string;
}

class EmptyListDisplay extends React.Component<IEmptyListDisplayProps> {
  public render() {
    const { clickHandler, title, classes } = this.props;
    return (
      <div className={classes.emptyList} onClick={clickHandler}>
        <Typography variant="headline">{title}</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmptyListDisplay);
