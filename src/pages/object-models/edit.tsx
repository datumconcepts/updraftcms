import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


import { IAppState } from 'Store/State';
import { IObjectModel } from 'Types';
import { defaultObjectModel } from 'Store/State/IObjectModel';

import ObjectModelEdit from 'Presentation/ObjectModels/ObjectModelEdit';
import Layout from 'Presentation/_Layout';
import { EDIT_OBJECT_MODEL, SAVE_OBJECT_MODEL } from 'Store/actions/ObjectModel';
import { DELETE_MEDIA_OBJECT } from 'Store/actions/MediaObject';

interface IRouteParams {
    id: string;
}

const ObjectModelsEditPage: React.FC = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const { id } = useParams<IRouteParams>();
    const dispatch = useDispatch();

    const valueChangeHandler = React.useCallback((objectModel: IObjectModel) => dispatch({
        type: EDIT_OBJECT_MODEL,
        objectModels: objectModels.set(objectModel.id, objectModel)
    }), [dispatch, objectModels]);

    const saveObjectModelHandler = React.useCallback((objectModel: IObjectModel) => dispatch({
        type: SAVE_OBJECT_MODEL,
        objectModels: [...objectModels.set(objectModel.id, objectModel)],
        objectModel
    }), [dispatch, objectModels]);

    const deleteObjectModelHandler = React.useCallback((objectModelId: string) => {
        const deletedObjectModel = objectModels.get(id);
        objectModels.delete(objectModelId);
        dispatch({ type: DELETE_MEDIA_OBJECT, objectModels, deletedObjectModel });
    }, [dispatch, objectModels]);

    return (<Layout>
        <ObjectModelEdit
            onValueChange={valueChangeHandler}
            objectModel={objectModels.get(id) || { ...defaultObjectModel, id }}
            saveObjectModel={saveObjectModelHandler}
            deleteObjectModel={deleteObjectModelHandler}
        /></Layout>
    );
}

export default ObjectModelsEditPage;