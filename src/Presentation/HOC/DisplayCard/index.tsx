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
      <Card fluid={true} onClick={this.props.clickAction} color="blue">
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{subHeader}</Card.Meta>
          {children}
        </Card.Content>
      </Card>
    );
  }
}
export default DisplayCard;