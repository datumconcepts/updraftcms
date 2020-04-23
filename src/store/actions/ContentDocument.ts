import { Action } from 'redux';

import { IContentDocument } from 'models';

export const REQUEST_CONTENT_DOCUMENTS = 'REQUEST_CONTENT_DOCUMENTS';
export const RECEIVE_CONTENT_DOCUMENTS = 'RECEIVE_CONTENT_DOCUMENTS';
export const EDIT_CONTENT_DOCUMENT = 'EDIT_CONTENT_DOCUMENT';
export const SAVE_CONTENT_DOCUMENT = 'SAVE_CONTENT_DOCUMENT';
export const DELETE_CONTENT_DOCUMENT = 'DELETE_CONTENT_DOCUMENT';




interface IRequestContentDocumentsAction extends Action {
    type: typeof REQUEST_CONTENT_DOCUMENTS;
}
interface IReceiveContentDocumentsAction extends Action {
    type: typeof RECEIVE_CONTENT_DOCUMENTS;
    contentDocuments: Map<string, IContentDocument>;
}
interface IEditContentDocumentsAction extends Action {
    type: typeof EDIT_CONTENT_DOCUMENT;
    contentDocuments: Map<string, IContentDocument>;
}
interface ISaveContentDocumentsAction extends Action {
    type: typeof SAVE_CONTENT_DOCUMENT;
    contentDocuments: Map<string, IContentDocument>;
    savedContentDocument: IContentDocument
}
interface IDeleteContentDocumentsAction extends Action {
    type: typeof DELETE_CONTENT_DOCUMENT;
    contentDocuments: Map<string, IContentDocument>;
    deletedContentDocument: IContentDocument
}

export type KnownContentDocumentActions = IEditContentDocumentsAction | IDeleteContentDocumentsAction | IReceiveContentDocumentsAction | IRequestContentDocumentsAction | ISaveContentDocumentsAction;

