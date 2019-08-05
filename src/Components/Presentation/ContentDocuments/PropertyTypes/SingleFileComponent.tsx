import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";


import { IPropertyMap } from "src/Types";

interface ISingleFileComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface ISingleFileComponentState {
  expanded: boolean;
}

class SingleFileComponent extends React.Component<
  ISingleFileComponentProps,
  ISingleFileComponentState
  > {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public changeValue = (e: any) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate(Object.assign({}, propertyMap, { [name]: value }));
  };

  public render() {
    return (
      <Grid item={true}>
        <Card square={true}>
          <CardActions>
            <input type="file" />
           
          </CardActions>
        </Card></Grid>
    );
  }
}
export default SingleFileComponent;
