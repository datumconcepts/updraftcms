import * as React from "react";
import { Card } from 'semantic-ui-react';
import { useHistory } from "react-router";


import { IObjectModel } from "Types";


import DisplayCard from 'Presentation/HOC/DisplayCard'
import EmptyListDisplay from "Presentation/HOC/EmptyListDisplay";
import AppContent from "Presentation/HOC/AppContent";


interface IObjectModelListProps {
  objectModels: IObjectModel[];
  addObjectModel: () => void;
}
const ObjectModelList: React.FC<IObjectModelListProps> = ({ objectModels, addObjectModel }) => {

  const history = useHistory();

  const editObjectModel = React.useCallback(({ id }: IObjectModel) => {
    history.push(`/object-models/${id}/edit`);
  }, [history]);

  return (
    <AppContent>
      {
        objectModels.length === 0 ? (
          <EmptyListDisplay
            clickHandler={addObjectModel}
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
                    clickAction={() => editObjectModel(objectModel)}

                  />
                ))
              }

            </Card.Group>
          )
      }
    </AppContent >
  );
}

export default ObjectModelList;
