import * as React from "react";

class FormField extends React.Component {
  public render() {
    const { children } = this.props;
    return <div style={{ padding: 18 }}>{children}</div>;
  }
}
export default FormField;
