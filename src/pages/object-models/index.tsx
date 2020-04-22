import React from 'react';

import { useSelector } from 'react-redux';
import { IAppState } from 'Store/State';

import ObjectModelList from 'Presentation/ObjectModels/ObjectModelList';
import Layout from 'Presentation/_Layout';

const ObjectModelsListPage: React.FC = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);

    return (<Layout>
        <ObjectModelList
            objectModels={[...objectModels.values()]}
        />
    </Layout>);
}

export default ObjectModelsListPage;