
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'Store/ActionCreators';
import { AppMiddlewareApi } from 'Store/StoreTypes';
import { IContentDocument, IObjectModel } from 'Types';


export interface IDataPersistenceMiddleware {
    DeleteObjectModel(deletedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): void;
    RequestObjectModels(): Map<string, IObjectModel>;
    SaveObjectModel(savedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): void;
    DeleteContentDocument(deletedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): void;
    RequestContentDocuments(): Map<string, IContentDocument>;
    SaveContentDocument(savedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): void;
}

export const middleware = (concreteClass: IDataPersistenceMiddleware) => {
    return (api: AppMiddlewareApi) =>
        (next: Dispatch<AnyAction>) =>
            (action: KnownAppActions) => {
                switch (action.type) {
                    case "DELETE_OBJECT_MODEL":
                        concreteClass.DeleteObjectModel(action.deletedObjectModel, action.objectModels);
                        break;
                    case "REQUEST_OBJECT_MODELS":
                        const objectModels = concreteClass.RequestObjectModels();
                        api.dispatch({ type: 'RECEIVE_OBJECT_MODELS', objectModels })
                        break;
                    case "SAVE_OBJECT_MODEL":
                        concreteClass.SaveObjectModel(action.savedObjectModel, action.objectModels);
                        break;
                    case "DELETE_CONTENT_DOCUMENT":
                        concreteClass.DeleteContentDocument(action.deletedContentDocument, action.contentDocuments);
                        break;
                    case "REQUEST_CONTENT_DOCUMENTS":
                        const contentDocuments = concreteClass.RequestContentDocuments();
                        api.dispatch({ type: 'RECEIVE_CONTENT_DOCUMENTS', contentDocuments });
                        break;
                    case "SAVE_CONTENT_DOCUMENT":
                        concreteClass.SaveContentDocument(action.savedContentDocument, action.contentDocuments);
                        break;
                }
                return next(action);
            }
}