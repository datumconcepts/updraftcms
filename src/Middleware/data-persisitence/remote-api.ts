import { IDataPersistenceMiddleware } from 'store/middleware-support/data-persistence';

import { IContentDocument, IObjectModel, } from 'models';


export class LocalStorageData implements IDataPersistenceMiddleware {

    public DeleteObjectModel(deletedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any> {
        return new Promise((resolve) => {
            resolve(deletedObjectModel);
        });
    }

    public RequestObjectModels(): Promise<Map<string, IObjectModel>> {
        return new Promise<Map<string, IObjectModel>>((resolve, reject) => {

            resolve(new Map<string, IObjectModel>());
        });
    }

    public SaveObjectModel(savedObjectModel: IObjectModel, objectModels: Map<string, IObjectModel>): Promise<any> {
        return new Promise((resolve) => {

        });
    }

    public DeleteContentDocument(deletedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any> {
        return new Promise((resolve) => {

            resolve(deletedContentDocument);
        });
    }

    public RequestContentDocuments(): Promise<Map<string, IContentDocument>> {
        return new Promise<Map<string, IContentDocument>>((resolve, reject) => {

            resolve(new Map<string, IContentDocument>());
        });
    }

    public SaveContentDocument(savedContentDocument: IContentDocument, contentDocuments: Map<string, IContentDocument>): Promise<any> {
        return new Promise((resolve) => {

            resolve(savedContentDocument);
        });
    }





}