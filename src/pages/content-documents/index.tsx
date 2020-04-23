import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import guid from "uuid/v4";

import useShortcuts from 'hooks/useShortcuts';

import useContentDocuments from 'hooks/useContentDocuments';
import useObjectModels from 'hooks/useObjectModels';
import { IAppState } from 'store/State';

import Layout from 'components/layout';
import ContentDocumentListToolbar from 'components/content-documents/content-document-list-toolbar';
import ContentDocumentMenu from 'components/content-documents/ContentDocumentMenu';
import ContentDocumentList from 'components/content-documents/ContentDocumentList';





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