
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'src/Store/ActionCreators';
import { AppMiddlewareApi } from 'src/Store/StoreTypes';
import { IContentDocument, IObjectModel } from 'src/Types';

const ContentocumentKey = "_content_dcuments";
const ObjectModelKey = "_object_models";

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
                case "DELETE_OBJECT_MODEL":
                    localStorage.setItem(ObjectModelKey, JSON.stringify([...action.objectModels.values()]));
                    break;
                case "REQUEST_OBJECT_MODELS":
                    const objectModelJson = localStorage.getItem(ObjectModelKey);
                    if (objectModelJson) {
                        const data: IObjectModel[] = JSON.parse(objectModelJson);
                        const objectModels = new Map(data.map(objectModel => [objectModel.id, objectModel] as [string, IObjectModel]));
                        api.dispatch({ type: 'RECEIVE_OBJECT_MODELS', objectModels })
                    }
                    break;
                case "SAVE_OBJECT_MODEL":
                    localStorage.setItem(ObjectModelKey, JSON.stringify([...action.objectModels.values()]));
                    break;
                case "DELETE_CONTENT_DOCUMENT":
                    localStorage.setItem(ContentocumentKey, JSON.stringify([...action.contentDocuments.values()]));
                    break;
                case "REQUEST_CONTENT_DOCUMENTS":
                    const contentDocumentJson = localStorage.getItem(ContentocumentKey);
                    if (contentDocumentJson) {
                        const data: IContentDocument[] = JSON.parse(contentDocumentJson);
                        const contentDocuments = new Map(data.map(contentDocument => [contentDocument.id, contentDocument] as [string, IContentDocument]));
                        api.dispatch({ type: 'RECEIVE_CONTENT_DOCUMENTS', contentDocuments })
                    }
                    break;
                case "SAVE_CONTENT_DOCUMENT":
                    localStorage.setItem(ContentocumentKey, JSON.stringify([...action.contentDocuments.values()]));
                    break;
            }
            return next(action);
        }
