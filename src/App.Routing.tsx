// tslint:disable:jsx-no-lambda
import * as React from "react";
import { Route } from "react-router-dom";

import ObjectModelIndexContainer from "./Components/Containers/ObjectModels";

class AppRouting extends React.Component {
  public render() {
    return (
      <Route
        path="/object-models"
        render={renderProps => (
          <ObjectModelIndexContainer  {...renderProps} {...this.props}/>
        )}
      />
    );
  }
}
export default AppRouting;
