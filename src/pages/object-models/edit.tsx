import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import guid from "uuid/v4";

import { IAppState } from 'store/State';
import { IObjectModel } from 'models';
import { defaultObjectModel } from 'store/State/IObjectModel';

import { SAVE_OBJECT_MODEL, DELETE_OBJECT_MODEL } from 'store/actions/ObjectModel';

import useObjectModels from 'hooks/useObjectModels';
import useShortcuts from 'hooks/useShortcuts';
import Layout from 'components/layout';
import ObjectModelEditToolbar from 'components/object-models/object-model-edit-toolbar';
import ObjectModelEdit from 'components/object-models/object-model-edit';


interface IRouteParams {
    id: string;
}

const ObjectModelsEditPage: React.FC = () => {

    useObjectModels();

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams<IRouteParams>();
    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const [objectModel, updateObjectModel] = React.useState<IObjectModel>(objectModels.get(id) || { ...defaultObjectModel, id });

    const closeObjectModel = React.useCallback(() => history.push(`/object-models`), [history]);

    React.useEffect(() => {
        if (id !== objectModel.id) {
            const om = objectModels.get(id);
            if (om) {
                updateObjectModel(om);
            }
        }
    }, [id, objectModels, objectModel])


    const saveObjectModelHandler = React.useCallback(() => {
        dispatch({
            type: SAVE_OBJECT_MODEL,
            objectModels: objectModels.set(objectModel.id, objectModel),
            objectModel
        });
        closeObjectModel();
    }, [dispatch, objectModels, objectModel, closeObjectModel]);


    const deleteObjectModelHandler = React.useCallback(() => {
        objectModels.delete(objectModel.id);
        dispatch({ type: DELETE_OBJECT_MODEL, objectModels, deletedObjectModel: objectModel });
        closeObjectModel();
    }, [dispatch, objectModels, objectModel, closeObjectModel]);

    const cloneObjectModelHandler = React.useCallback(() => {
        saveObjectModelHandler();

        let id = guid().replace(/-/g, "");
        while (objectModels.get(id)) {
            id = guid().replace(/-/g, "");
        }
        const clonedObjecetModel = { ...objectModel, id, name: `Clone of ${objectModel.name}` };

        dispatch({
            type: SAVE_OBJECT_MODEL,
            objectModels: objectModels.set(id, clonedObjecetModel),
            objectModel: clonedObjecetModel
        });

        history.push(`/object-models/${id}/edit`);
    }, [dispatch, objectModels, objectModel, history, saveObjectModelHandler]);


    useShortcuts([
        { key: 's', action: saveObjectModelHandler },
        { key: 'd', action: deleteObjectModelHandler },
        { key: 'q', action: closeObjectModel },
        { key: 'c', action: cloneObjectModelHandler }
    ]);

    return (<Layout>
        <ObjectModelEditToolbar isNew={objectModels.get(id) ? false : true}
            saveObjectModel={saveObjectModelHandler}
            cloneObjectModel={cloneObjectModelHandler}
            deleteObjectModel={deleteObjectModelHandler}
            closeObjectModel={closeObjectModel} />
        <ObjectModelEdit onValueChange={updateObjectModel} objectModel={objectModel} />
    </Layout>
    );
}

export default ObjectModelsEditPage;