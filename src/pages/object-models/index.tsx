import React from 'react';
import { useHistory } from 'react-router';
import guid from "uuid/v4";


import useShortcuts from 'hooks/useShortcuts';
import useObjectModels from 'hooks/useObjectModels';
import Layout from 'components/layout';
import ObjectModelListToolbar from 'components/object-models/object-model-list-toolbar';
import ObjectModelList from 'components/object-models/object-model-list';



const ObjectModelsListPage: React.FC = () => {

    const objectModels = useObjectModels();

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