import { IDataPersistenceMiddleware } from 'src/Store/MiddlewareSupport/data-persistence';

import { IContentDocument, IObjectModel, } from 'src/Types';

const ContentocumentKey = "_content_dcuments";
const ObjectModelKey = "_object_models";

export class LocalStorageData implements IDataPersistenceMiddleware {
    public DeleteObjectModel(deletedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): void {
        localStorage.setItem(ObjectModelKey, JSON.stringify([...objectModels.values()]));
    }
    public RequestObjectModels(): Map<string, IObjectModel> {
        const objectModelJson = localStorage.getItem(ObjectModelKey);
        if (objectModelJson) {
            const data: IObjectModel[] = JSON.parse(objectModelJson);
            return new Map(data.map(objectModel => [objectModel.id, objectModel] as [string, IObjectModel]));
        }
        return new Map<string, IObjectModel>();
    }
    public SaveObjectModel(savedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): void {
        localStorage.setItem(ObjectModelKey, JSON.stringify([...objectModels.values()]));
    }
    public DeleteContentDocument(deletedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): void {
        localStorage.setItem(ContentocumentKey, JSON.stringify([...contentDocuments.values()]));
    }
    public RequestContentDocuments(): Map<string, IContentDocument> {

        const contentDocumentJson = localStorage.getItem(ContentocumentKey);
        if (contentDocumentJson) {
            const data: IContentDocument[] = JSON.parse(contentDocumentJson);
            return new Map(data.map(contentDocument => [contentDocument.id, contentDocument] as [string, IContentDocument]));
        }
        return new Map<string, IContentDocument>();
    }
    public SaveContentDocument(savedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): void {
        localStorage.setItem(ContentocumentKey, JSON.stringify([...contentDocuments.values()]));
    }





}