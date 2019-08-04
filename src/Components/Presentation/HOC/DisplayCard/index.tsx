import * as React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

export interface IDisplayCardProps {
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
      headerAction
    } = this.props;
    return (
      <Card square={true}>
        <CardHeader onClick={this.props.clickAction}
          avatar={avatar}
          action={headerAction}
          title={title}
          subheader={subHeader}
        />
        {children}</Card>
    );
  }
}
export default DisplayCard;