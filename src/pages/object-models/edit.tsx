import React from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import guid from "uuid/v4";

import { IAppState } from "store/State";
import { IObjectModel, FormErrors } from "models";
import { defaultObjectModel } from "store/State/IObjectModel";

import {
  SAVE_OBJECT_MODEL,
  DELETE_OBJECT_MODEL,
} from "store/actions/ObjectModel";

import useObjectModels from "hooks/useObjectModels";
import useShortcuts from "hooks/useShortcuts";
import Layout from "components/layout";
import ObjectModelEditToolbar from "components/object-models/object-model-edit-toolbar";
import ObjectModelEdit from "components/object-models/object-model-edit";

interface IRouteParams {
  id: string;
}

const ObjectModelsEditPage: React.FC = () => {
  useObjectModels();

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<IRouteParams>();
  const { objectModels } = useSelector(
    (appState: IAppState) => appState.objectModel
  );
  const [objectModel, updateObjectModel] = React.useState<IObjectModel>(
    objectModels.get(id) || { ...defaultObjectModel, id }
  );
  const [errors, updateErrors] = React.useState<FormErrors>(
    new Map<string, string>()
  );

  /*
    with form errors being a map<stirng,string> when there is an error to be added just call set
e.g. errors.set('name', 'name is a mandatory field');
to remove it you can then call errors.delete('name')
once you've changed the errors map you'll need to reassign it to the state (e.g setErrors(errors)
    */

  const closeObjectModel = React.useCallback(
    () => history.push(`/object-models`),
    [history]
  );

  React.useEffect(() => {
    if (id !== objectModel.id) {
      const om = objectModels.get(id);
      if (om) {
        updateObjectModel(om);
      }
    }
  }, [id, objectModels, objectModel]);

  //check for errors, don't add but remove them if not needed
  //if name isn't blank and theres an error remove the error

  const valueChangeHandler = React.useCallback(
    (updatedModel: IObjectModel) => {
      updateObjectModel(updatedModel);
      if (updatedModel.name !== "") {
        errors.delete("name");
      }
      updateErrors(errors);
    },
    [errors, updateErrors, updateObjectModel, objectModel]
  );

  const saveObjectModelHandler = React.useCallback(() => {
    if (objectModel.name === "") {
      updateErrors(errors.set("name", "Name is a mandatory field"));
      return false;
    } else {
      dispatch({
        type: SAVE_OBJECT_MODEL,
        objectModels: objectModels.set(objectModel.id, objectModel),
        objectModel,
      });
      closeObjectModel();
      return true;
    }
  }, [
    errors,
    updateErrors,
    dispatch,
    objectModels,
    objectModel,
    closeObjectModel,
  ]);

  const deleteObjectModelHandler = React.useCallback(() => {
    objectModels.delete(objectModel.id);
    dispatch({
      type: DELETE_OBJECT_MODEL,
      objectModels,
      deletedObjectModel: objectModel,
    });
    closeObjectModel();
  }, [dispatch, objectModels, objectModel, closeObjectModel]);

  const cloneObjectModelHandler = React.useCallback(() => {
    if (saveObjectModelHandler()) {
      saveObjectModelHandler();

      let id = guid().replace(/-/g, "");
      while (objectModels.get(id)) {
        id = guid().replace(/-/g, "");
      }
      const clonedObjecetModel = {
        ...objectModel,
        id,
        name: `Clone of ${objectModel.name}`,
      };

      dispatch({
        type: SAVE_OBJECT_MODEL,
        objectModels: objectModels.set(id, clonedObjecetModel),
        objectModel: clonedObjecetModel,
      });

      history.push(`/object-models/${id}/edit`);
    }
  }, [dispatch, objectModels, objectModel, history, saveObjectModelHandler]);

  useShortcuts([
    { key: "s", action: saveObjectModelHandler },
    { key: "d", action: deleteObjectModelHandler },
    { key: "q", action: closeObjectModel },
    { key: "c", action: cloneObjectModelHandler },
  ]);

  return (
    <Layout>
      <ObjectModelEditToolbar
        isNew={objectModels.get(id) ? false : true}
        saveObjectModel={saveObjectModelHandler}
        cloneObjectModel={cloneObjectModelHandler}
        deleteObjectModel={deleteObjectModelHandler}
        closeObjectModel={closeObjectModel}
      />
      <ObjectModelEdit
        errors={errors}
        onValueChange={valueChangeHandler}
        objectModel={objectModel}
      />
    </Layout>
  );
};

export default ObjectModelsEditPage;
