import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import guid from "uuid/v4";


import { IAppState } from 'store/State';
import useShortcuts from 'hooks/useShortcuts';
import useObjectModels from 'hooks/useObjectModels';

import Layout from 'Presentation/_Layout';

import ObjectModelList from 'Presentation/ObjectModels/ObjectModelList';
import ObjectModelListToolbar from 'Presentation/ObjectModels/object-model-list-toolbar';

const ObjectModelsListPage: React.FC = () => {

    useObjectModels();

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const history = useHistory();


    const addObjectModel = React.useCallback(() => {
        let id = guid().replace(/-/g, "");
        while (objectModels.get(id)) {
            id = guid().replace(/-/g, "");
        }
        history.push(`/object-models/${guid().replace(/-/g, "")}/edit`);
    }, [objectModels, history]);

    useShortcuts([{ key: 'a', action: addObjectModel }]);


    return (<Layout>
        <ObjectModelListToolbar addObjectModel={addObjectModel} />
        <ObjectModelList addObjectModel={addObjectModel} objectModels={[...objectModels.values()]} />
    </Layout>);
}

export default ObjectModelsListPage;