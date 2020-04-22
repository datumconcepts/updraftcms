import React from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { IAppState } from 'Store/State';
import { IContentDocument } from 'Types';
import { defaultContentDocument } from 'Store/State/IContentDocument';

import Layout from 'Presentation/_Layout';
import ContentDocumentEdit from 'Presentation/ContentDocuments/ContentDocumentEdit';

interface IRouteParams {
    objectModelId?: string;
    id: string;
}

const ContentDocumentsEditPage: React.FC = () => {

    const [contentDocument, setContentDocument] = React.useState<IContentDocument>();
    const { contentDocuments, objectModels } = useSelector((appState: IAppState) => ({ ...appState.contentDocument, ...appState.objectModel }));
    const { id, objectModelId } = useParams<IRouteParams>();
    const dispatch = useDispatch();

    const valueChangeHandler = React.useCallback((contentDocument: IContentDocument) => { }, [dispatch]);
    const saveContentDocumentHandler = React.useCallback((contentDocument: IContentDocument) => { }, [dispatch]);
    const deleteContentDocumentHandler = React.useCallback((contentDocumentId: string) => { }, [dispatch]);


    React.useEffect(() => {
        let _contentDocument: IContentDocument = contentDocuments.get(id) || { ...defaultContentDocument, id };
        if (objectModelId) {
            const objectModel = objectModels.get(objectModelId);
            if (objectModel) {
                _contentDocument = {
                    ..._contentDocument,
                    htmlProperties: [..._contentDocument.htmlProperties.filter(prop =>
                        objectModel.htmlProperties.find(template => template.id === prop.propertyMapId)),
                    ...objectModel.htmlProperties.filter(template =>
                        !_contentDocument.htmlProperties.find(prop => template.id === prop.propertyMapId)).map(
                            (prop, index) =>
                                ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
                        )],
                    metaProperties: [..._contentDocument.metaProperties.filter(prop =>
                        objectModel.metaProperties.find(template => template.id === prop.propertyMapId)),
                    ...objectModel.metaProperties.filter(template =>
                        !_contentDocument.metaProperties.find(prop => template.id === prop.propertyMapId)).map(
                            (prop, index) => ({ propertyMapId: prop.id, value: prop.defaultValue || "" })
                        )],
                    objectModelId: objectModel.id
                }
            }
        }
        setContentDocument(_contentDocument);

    }, [objectModels, contentDocuments, objectModelId]);


    return (<Layout>
        {
            contentDocument && <ContentDocumentEdit
                contentDocument={contentDocument}
                objectModels={objectModels}
                onValueChange={valueChangeHandler}
                deleteContentDocument={deleteContentDocumentHandler}
                saveContentDocument={saveContentDocumentHandler} />
        }
    </Layout>);
}

export default ContentDocumentsEditPage;