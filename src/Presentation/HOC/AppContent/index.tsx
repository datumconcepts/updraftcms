import * as React from "react";
import { Segment } from "semantic-ui-react";


export interface IAppContentProps { }

class AppContent extends React.Component<IAppContentProps> {
  public render() {
    const { children } = this.props;
    return <Segment basic={true} className="workspace-container">{children}</Segment>;
  }
}

export default AppContent;
