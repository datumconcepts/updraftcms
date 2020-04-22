import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";



import { IObjectModel } from "Types";

import DisplayCard from "../HOC/DisplayCard";
import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import guid from "uuid/v4";
import { Card } from 'semantic-ui-react';

interface IObjectModelListProps extends RouteComponentProps {
  objectModels: IObjectModel[];
}
class ObjectModelList extends React.Component<IObjectModelListProps> {

  public addObjectModel = () => {
    const { objectModels, history } = this.props;
    let id = guid().replace(/-/g, "");
    while (objectModels.find(model => model.id === id)) {
      id = guid().replace(/-/g, "");
    }
    history.push(`/object-models/${guid().replace(/-/g, "")}/edit`);
  };
  public editObjectModel = (objectModel: IObjectModel) => {
    const { history } = this.props;
    history.push(`/object-models/${objectModel.id}/edit`);
  }

  public componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts);
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts);
  }

  public registerShortcuts = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'a':
          event.preventDefault();
          this.addObjectModel();
          break;
      }
    }
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
            <Card.Group>
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

            </Card.Group>
          )
        }
      </AppContent>
    );
  }
}

export default withRouter(ObjectModelList);
