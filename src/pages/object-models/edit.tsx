import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


import { IAppState } from 'Store/State';
import { IObjectModel } from 'Types';
import { defaultObjectModel } from 'Store/State/IObjectModel';

import ObjectModelEdit from 'Presentation/ObjectModels/ObjectModelEdit';
import Layout from 'Presentation/_Layout';

interface IRouteParams {
    id: string;
}

const ObjectModelsEditPage: React.FC = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const { id } = useParams<IRouteParams>();
    const dispatch = useDispatch();

    const valueChangeHandler = React.useCallback((objectModel: IObjectModel) => { }, [dispatch]);
    const saveObjectModelHandler = React.useCallback((objectModel: IObjectModel) => { }, [dispatch]);
    const deleteObjectModelHandler = React.useCallback((objectModelId: string) => { }, [dispatch]);

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