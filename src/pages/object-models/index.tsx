import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { REQUEST_OBJECT_MODELS } from 'Store/actions/ObjectModel';
import { IAppState } from 'Store/State';

import guid from "uuid/v4";

import Layout from 'Presentation/_Layout';

import ObjectModelList from 'Presentation/ObjectModels/ObjectModelList';
import ObjectModelListToolbar from 'Presentation/ObjectModels/object-model-list-toolbar';
import { useHistory } from 'react-router';
import useShortcuts from 'hooks/useShortcuts';

const ObjectModelsListPage: React.FC = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const history = useHistory();
    const dispatch = useDispatch();

    const addObjectModel = React.useCallback(() => {
        let id = guid().replace(/-/g, "");
        while (objectModels.get(id)) {
            id = guid().replace(/-/g, "");
        }
        history.push(`/object-models/${guid().replace(/-/g, "")}/edit`);
    }, [objectModels, history]);

    useShortcuts([{ key: 'a', action: addObjectModel }]);


    React.useEffect(() => {
        dispatch({ type: REQUEST_OBJECT_MODELS });
    }, [dispatch])

    return (<Layout>
        <ObjectModelListToolbar addObjectModel={addObjectModel} />
        <ObjectModelList addObjectModel={addObjectModel} objectModels={[...objectModels.values()]} />
    </Layout>);
}

export default ObjectModelsListPage;