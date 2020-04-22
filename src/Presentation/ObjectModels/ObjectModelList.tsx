import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";



import { IObjectModel } from "Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import guid from "uuid/v4";
import { Grid } from 'semantic-ui-react';

interface IObjectModelListProps extends RouteComponentProps {
  objectModels: IObjectModel[];
}
class ObjectModelList extends React.Component<IObjectModelListProps> {

  public addObjectModel = (event: any) => {
    const { objectModels, history } = this.props;
    let id = guid().replace(/-/g, "");
    while (objectModels.find(model => model.id === id)) {
      id = guid().replace(/-/g, "");
    }
    history.push(`/object-models/edit/${guid().replace(/-/g, "")}`);
  };
  public editObjectModel = (objectModel: IObjectModel) => {
    const { history } = this.props;
    history.push(`/object-models/edit/${objectModel.id}`);
  }

  public render() {
    const { objectModels } = this.props;
    return (
      <AppContent>
        {objectModels.length === 0 ? (
          <EmptyListDisplay
            clickHandler={this.addObjectModel}
            title="It looks like you have no object models yet. Click here to add a new one"
          />
        ) : (
            <Grid direction="column" container={true} spacing={10}>
              {([] as IObjectModel[])
                .concat(objectModels)
                .map((objectModel, objectModelIndex) => (
                  <DisplayCard key={`object_model_${objectModelIndex}`}
                    title={objectModel.name}
                    subHeader={objectModel.id}
                    clickAction={() => this.editObjectModel(objectModel)}

                  />
                ))
              }

            </Grid>
          )}
      </AppContent>
    );
  }
}

export default withRouter(ObjectModelList);
