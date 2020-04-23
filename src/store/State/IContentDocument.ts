import { IContentDocument } from 'models';

export interface IContentDocumentState {
    isLoading: boolean;
    contentDocuments: Map<string, IContentDocument>;
    selectedContentDocumentId?: string;
}


export const defaultContentDocument: IContentDocument = { name: "", htmlProperties: [], id: "", metaProperties: [], objectModelId: "" };

export const unloadedContentDocumentState: IContentDocumentState = { isLoading: false, contentDocuments: new Map<string, IContentDocument>(), };