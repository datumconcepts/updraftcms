import * as React from "react";


export interface IDisplayCardProps  {
  actions?: React.ReactFragment;
  title: string;
  subHeader?: string;
  avatar?: React.ReactFragment;
  headerAction?: React.ReactFragment;
}

class DisplayCard extends React.Component<IDisplayCardProps> {
  public render() {
    const {
      children,
      title,
    } = this.props;
    return (
    <div title={title}>{children}</div>
    );
  }
}
export default DisplayCard;