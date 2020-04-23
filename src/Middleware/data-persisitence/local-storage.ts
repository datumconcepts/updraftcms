import { IDataPersistenceMiddleware } from 'store-data/middleware-support/data-persistencee';

import { IContentDocument, IObjectModel, } from 'Types';

const ContentocumentKey = "_content_dcuments";
const ObjectModelKey = "_object_models";

export class LocalStorageData implements IDataPersistenceMiddleware {

    public DeleteObjectModel(deletedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem(ObjectModelKey, JSON.stringify([...objectModels.values()]));
            resolve(deletedObjectModel);
        });
    }

    public RequestObjectModels(): Promise<Map<string, IObjectModel>> {
        return new Promise<Map<string, IObjectModel>>((resolve, reject) => {
            const objectModelJson = localStorage.getItem(ObjectModelKey);
            if (objectModelJson) {
                const data: IObjectModel[] = JSON.parse(objectModelJson);
                resolve(new Map(data.map(objectModel => [objectModel.id, objectModel] as [string, IObjectModel])));
            }
            resolve(new Map<string, IObjectModel>());
        });
    }

    public SaveObjectModel(savedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem(ObjectModelKey, JSON.stringify([...objectModels.values()]));
            resolve(savedObjectModel);
        });
    }

    public DeleteContentDocument(deletedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem(ContentocumentKey, JSON.stringify([...contentDocuments.values()]));
            resolve(deletedContentDocument);
        });
    }

    public RequestContentDocuments(): Promise<Map<string, IContentDocument>> {
        return new Promise<Map<string, IContentDocument>>((resolve, reject) => {
            const contentDocumentJson = localStorage.getItem(ContentocumentKey);
            if (contentDocumentJson) {
                const data: IContentDocument[] = JSON.parse(contentDocumentJson);
                resolve(new Map(data.map(contentDocument => [contentDocument.id, contentDocument] as [string, IContentDocument])));
            }
            resolve(new Map<string, IContentDocument>());
        });
    }

    public SaveContentDocument(savedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem(ContentocumentKey, JSON.stringify([...contentDocuments.values()]));
            resolve(savedContentDocument);
        });
    }





}