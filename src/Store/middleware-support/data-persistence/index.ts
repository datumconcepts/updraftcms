
import { AnyAction, Dispatch } from 'store/middleware-support/data-persistence/node_modules/redux';

import { KnownAppActions } from 'store/actions';
import { AppMiddlewareApi } from 'store/StoreTypes';
import { IContentDocument, IObjectModel } from 'Types';


export interface IDataPersistenceMiddleware {
    DeleteObjectModel(deletedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any>;
    RequestObjectModels(): Promise<Map<string, IObjectModel>>;
    SaveObjectModel(savedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any>;
    DeleteContentDocument(deletedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any>;
    RequestContentDocuments(): Promise<Map<string, IContentDocument>>;
    SaveContentDocument(savedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any>;
}

export const middleware = (concreteClass: IDataPersistenceMiddleware) => {
    return (api: AppMiddlewareApi) =>
        (next: Dispatch<AnyAction>) =>
            async (action: KnownAppActions) => {
                switch (action.type) {
                    case "DELETE_OBJECT_MODEL":
                        await concreteClass.DeleteObjectModel(action.deletedObjectModel, action.objectModels);
                        return next(action);
                    case "REQUEST_OBJECT_MODELS":
                        const objectModels = await concreteClass.RequestObjectModels();
                        return next({ type: 'RECEIVE_OBJECT_MODELS', objectModels })
                    case "SAVE_OBJECT_MODEL":
                        await concreteClass.SaveObjectModel(action.savedObjectModel, action.objectModels);
                        return next(action);
                    case "DELETE_CONTENT_DOCUMENT":
                        await concreteClass.DeleteContentDocument(action.deletedContentDocument, action.contentDocuments);
                        return next(action);
                    case "REQUEST_CONTENT_DOCUMENTS":
                        const contentDocuments = await concreteClass.RequestContentDocuments();
                        api.dispatch({ type: 'RECEIVE_CONTENT_DOCUMENTS', contentDocuments });
                        return next(action);
                    case "SAVE_CONTENT_DOCUMENT":
                        await concreteClass.SaveContentDocument(action.savedContentDocument, action.contentDocuments);
                        return next(action);
                    default:
                        return next(action);
                }
            }
}