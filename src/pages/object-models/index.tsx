import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { REQUEST_OBJECT_MODELS } from 'Store/actions/ObjectModel';
import { IAppState } from 'Store/State';

import ObjectModelList from 'Presentation/ObjectModels/ObjectModelList';
import Layout from 'Presentation/_Layout';

const ObjectModelsListPage: React.FC = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: REQUEST_OBJECT_MODELS });
    }, [dispatch])

    return (<Layout>
        <ObjectModelList
            objectModels={[...objectModels.values()]}
        />
    </Layout>);
}

export default ObjectModelsListPage;