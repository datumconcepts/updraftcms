import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import guid from "uuid/v4";

import useShortcuts from 'hooks/useShortcuts';

import useContentDocuments from 'hooks/useContentDocuments';
import useObjectModels from 'hooks/useObjectModels';
import { IAppState } from 'store-data/State';

import Layout from 'Presentation/_Layout';
import ContentDocumentMenu from 'Presentation/ContentDocuments/ContentDocumentMenu';
import ContentDocumentList from 'Presentation/ContentDocuments/ContentDocumentList';
import ContentDocumentListToolbar from 'Presentation/ContentDocuments/content-document-list-toolbar';



interface IRouteParams {
    objectModelId?: string;
}

const ContentDocumentsListPage: React.FC = () => {

    useContentDocuments();
    useObjectModels();

    const { contentDocuments, objectModels } = useSelector((appState: IAppState) => ({ ...appState.contentDocument, ...appState.objectModel }));
    const { objectModelId } = useParams<IRouteParams>();
    const history = useHistory();

    const addContentDocument = React.useCallback(() => {
        let id = guid().replace(/-/g, "");
        while (contentDocuments.get(id)) {
            id = guid().replace(/-/g, "");
        }
        history.push(objectModelId ? `/${objectModelId}/content/${id}/edit` : `/content/${id}/edit`);
    }, [objectModelId, contentDocuments, history]);

    useShortcuts([{ key: 'a', action: addContentDocument }]);

    return (<Layout>
        <ContentDocumentListToolbar addContentDocument={addContentDocument} />
        <Grid stretched={true} style={{ flex: 1 }}>
            <Grid.Column width={2}>
                <ContentDocumentMenu objectModels={[...objectModels.values()]} />
            </Grid.Column>
            <Grid.Column width={14}>
                <ContentDocumentList contentDocuments={[...contentDocuments.values()]} addContentDocument={addContentDocument} />
            </Grid.Column >
        </Grid>
    </Layout >);
}

export default ContentDocumentsListPage;