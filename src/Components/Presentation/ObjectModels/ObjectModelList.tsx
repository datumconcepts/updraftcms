import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { IObjectModel } from "../../../Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";
import PageToolbar from "../HOC/PageToolbar";

interface IObjectModelListProps extends RouteComponentProps {
  objectModels: IObjectModel[];
  onCreateObjectModel: () => void;
}
class ObjectModelList extends React.Component<IObjectModelListProps> {

  public addObjectModel = (event: any) => {
    const { onCreateObjectModel, history } = this.props;
    history.push("/object-models/create");
    onCreateObjectModel();
  };
  public render() {
    const { objectModels } = this.props;
    return (
      <React.Fragment>
        <AppContent>
          <PageToolbar />
          {objectModels.length === 0 ? (
            <EmptyListDisplay
              clickHandler={this.addObjectModel}
              title="It looks like you have no object models yet. Click here to add a new one"
            />
          ) : (
              <div>
                {([] as IObjectModel[])
                  .concat(objectModels)
                  .map((objectModel, objectModelIndex) => (
                    <div key={`object_model_${objectModelIndex}`}>
                      <DisplayCard
                        title={objectModel.name}
                        subHeader="Welcome to Earth"
                      >
                        It's a brand new Day
                    </DisplayCard>
                    </div>
                  ))}
              </div>
            )}
        </AppContent>
      </React.Fragment>
    );
  }
}

export default withRouter(ObjectModelList);
