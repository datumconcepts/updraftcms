import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import guid from "uuid/v4";

import { IAppState } from 'store/State';
import { IContentDocument } from 'Types';
import { SAVE_CONTENT_DOCUMENT, DELETE_CONTENT_DOCUMENT } from 'store/actions/ContentDocument';
import { defaultContentDocument } from 'store/State/IContentDocument';

import useObjectModels from 'hooks/useObjectModels';
import useContentDocuments from 'hooks/useContentDocuments';

import Layout from 'Presentation/_Layout';
import ContentDocumentEdit from 'Presentation/ContentDocuments/ContentDocumentEdit';
import ContentDocumentEditToolbar from 'Presentation/ContentDocuments/content-document-edit-toolbar';

interface IRouteParams {
    objectModelId?: string;
    id: string;
}

const ContentDocumentsEditPage: React.FC = () => {

    useContentDocuments();
    useObjectModels();

    const history = useHistory();
    const dispatch = useDispatch();
    const { id, objectModelId } = useParams<IRouteParams>();
    const { contentDocuments, objectModels } = useSelector((appState: IAppState) => ({ ...appState.contentDocument, ...appState.objectModel }));
    const [contentDocument, updateContentDocument] = React.useState<IContentDocument>();


    const closeContentDocument = React.useCallback(() => history.push(objectModelId ? `/${objectModelId}/content` : `/content`), [history, objectModelId]);

    const saveContentDocumentHandler = React.useCallback((closeDocument: boolean = true) => {
        if (contentDocument) {
            dispatch({
                type: SAVE_CONTENT_DOCUMENT,
                contentDocuments: contentDocuments.set(contentDocument.id, contentDocument),
                contentDocument
            });
            if (closeDocument) {
                closeContentDocument();
            }
        }
    }, [dispatch, closeContentDocument, contentDocuments, contentDocument]);

    const deleteContentDocumentHandler = React.useCallback(() => {
        if (contentDocument) {
            contentDocuments.delete(contentDocument.id);
            dispatch({ type: DELETE_CONTENT_DOCUMENT, contentDocuments, deleteContentDocument: contentDocument });
            closeContentDocument();
        }
    }, [dispatch, closeContentDocument, contentDocuments, contentDocument]);


    const cloneContentDocumentHandler = React.useCallback(() => {
        if (contentDocument) {
            saveContentDocumentHandler(false);

            let id = guid().replace(/-/g, "");
            while (contentDocuments.get(id)) {
                id = guid().replace(/-/g, "");
            }
            const clonedContentDocument = { ...contentDocument, id, name: `Clone of ${contentDocument.name}` };

            dispatch({
                type: SAVE_CONTENT_DOCUMENT,
                contentDocuments: contentDocuments.set(id, clonedContentDocument),
                contentDocument: clonedContentDocument
            });
            history.push(objectModelId ? `/${objectModelId}/content/${id}/edit` : `/content/${id}/edit`);
        }
    }, [dispatch, contentDocument, contentDocuments, closeContentDocument, saveContentDocumentHandler, objectModelId]);



    React.useEffect(() => {
        let _contentDocument: IContentDocument = contentDocuments.get(id) || { ...defaultContentDocument, id };
        if (objectModelId) {
            const objectModel = objectModels.get(objectModelId);
            if (objectModel) {
                _contentDocument = {
                    ..._contentDocument,
                    htmlProperties: [
                        ...objectModel.htmlProperties.filter(template => !_contentDocument.htmlProperties.find(prop => template.id === prop.propertyMapId)).map((prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || '' })),
                        ..._contentDocument.htmlProperties.filter(prop => objectModel.htmlProperties.find(template => template.id === prop.propertyMapId)),
                    ],
                    metaProperties: [
                        ...objectModel.metaProperties.filter(template => !_contentDocument.metaProperties.find(prop => template.id === prop.propertyMapId)).map((prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || '' })),
                        ..._contentDocument.metaProperties.filter(prop => objectModel.metaProperties.find(template => template.id === prop.propertyMapId))
                    ],
                    objectModelId: objectModel.id
                }
            }
        }
        updateContentDocument(_contentDocument);

    }, [objectModels, contentDocuments, objectModelId, id]);


    return (<Layout>
        <ContentDocumentEditToolbar
            cloneContentDocument={cloneContentDocumentHandler}
            closeContentDocument={closeContentDocument}
            saveContentDocument={saveContentDocumentHandler}
            deleteContentDocument={deleteContentDocumentHandler}
            isNew={contentDocuments.get(id) ? false : true} />
        {
            contentDocument && <ContentDocumentEdit contentDocument={contentDocument} objectModels={objectModels} onValueChange={updateContentDocument} />
        }
    </Layout>);
}

export default ContentDocumentsEditPage;