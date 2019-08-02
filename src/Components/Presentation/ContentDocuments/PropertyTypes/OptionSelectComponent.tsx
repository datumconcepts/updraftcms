import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

import Select from "react-select";

import { IPropertyMap } from "src/Types";

interface IOptionSelectComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface IOptionSelectComponentState {
  expanded: boolean;
}

class OptionSelectComponent extends React.Component<
  IOptionSelectComponentProps,
  IOptionSelectComponentState
> {
  public state = {
    expanded: false
  };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public changeValue = (e:any) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate(Object.assign({}, propertyMap, { [name]: value }));
  };

  public render() {
    const { propertyMap } = this.props;
    return (
      <Card square={true}>
        <CardActions>
          <Select fullWidth={true} label={propertyMap.name} />

        </CardActions>
        
      </Card>
    );
  }
}
export default OptionSelectComponent;
