import * as React from "react";


import { withStyles, WithStyles } from '@material-ui/core';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import  styles from './styles';

export interface IDisplayCardProps extends WithStyles<typeof styles> {
  actions?: React.ReactFragment;
  title: string;
  subHeader?: string;
  avatar?: React.ReactFragment;
  headerAction?: React.ReactFragment;
  clickAction: () => void;
}

class DisplayCard extends React.Component<IDisplayCardProps> {
  public render() {
    const {
      children,
      title,
      subHeader,
      avatar,
      headerAction,
      classes
    } = this.props;
    return (
      <Card square={true}>
        <CardHeader className={classes.displayCardHeader}
          onClick={this.props.clickAction}
          avatar={avatar}
          action={headerAction}
          title={title}
          subheader={subHeader}
        />
        {children}</Card>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DisplayCard);