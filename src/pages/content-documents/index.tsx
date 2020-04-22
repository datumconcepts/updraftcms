import React from 'react';

import ContentDocumentList from 'Presentation/ContentDocuments/ContentDocumentList';
import { useSelector } from 'react-redux';
import { IAppState } from 'Store/State';
import Layout from 'Presentation/_Layout';

const ContentDocumentsListPage: React.FC = () => {

    const { contentDocuments, objectModels } = useSelector((appState: IAppState) => ({ ...appState.contentDocument, ...appState.objectModel }));

    return (<Layout>
        <ContentDocumentList
            objectModels={[...objectModels.values()]}
            contentDocuments={[...contentDocuments.values()]}
        />
    </Layout>);
}

export default ContentDocumentsListPage;