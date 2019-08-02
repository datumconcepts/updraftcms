import { IContentDocument } from 'src/Types';

export interface IContentDocumentState {
    isLoading: boolean;
    contentDocuments: Map<string, IContentDocument>;
    selectedContentDocumentId?: string;
}


export const defaultContentDocument = { name: "", htmlProperties: [], id: "", metaProperties: [], objectModelId: "" } as IContentDocument;

export const unloadedContentDocumentState: IContentDocumentState = { isLoading: false, contentDocuments: new Map<string, IContentDocument>(), };