import * as React from "react";


import { Card } from 'semantic-ui-react';

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
      headerAction,
    } = this.props;
    return (
      <Card>
        <Card.Header className={'display-card-header'}
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
export default DisplayCard;