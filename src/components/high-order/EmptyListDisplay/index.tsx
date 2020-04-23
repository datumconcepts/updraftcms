import * as React from "react";

import { Header } from 'semantic-ui-react';



export interface IEmptyListDisplayProps {
  clickHandler: (event: any) => void;
  title: string;
}

class EmptyListDisplay extends React.Component<IEmptyListDisplayProps> {
  public render() {
    const { clickHandler, title } = this.props;
    return (
      <div className={'empty-list'} onClick={clickHandler}>
        <Header as="h5">{title}</Header>
      </div>
    );
  }
}

export default EmptyListDisplay;
