import { Action } from 'redux';

import { IAppState } from 'Store/State';
import { AppDispatch } from 'Store/StoreTypes';

import { IContentDocument } from 'Types';

interface IRequestContentDocumentsAction extends Action {
    type: 'REQUEST_CONTENT_DOCUMENTS';
}
interface IReceiveContentDocumentsAction extends Action {
    type: 'RECEIVE_CONTENT_DOCUMENTS';
    contentDocuments: Map<string, IContentDocument>;
}
interface IEditContentDocumentsAction extends Action {
    type: 'EDIT_CONTENT_DOCUMENT';
    contentDocuments: Map<string, IContentDocument>;
}
interface ISaveContentDocumentsAction extends Action {
    type: 'SAVE_CONTENT_DOCUMENT';
    contentDocuments: Map<string, IContentDocument>;
    savedContentDocument: IContentDocument
}
interface IDeleteContentDocumentsAction extends Action {
    type: 'DELETE_CONTENT_DOCUMENT';
    contentDocuments: Map<string, IContentDocument>;
    deletedContentDocument: IContentDocument
}

export type KnownContentDocumentActions = IEditContentDocumentsAction | IDeleteContentDocumentsAction | IReceiveContentDocumentsAction | IRequestContentDocumentsAction | ISaveContentDocumentsAction;

export const ContentDocumentActionCreators = {
    deleteContentDocument: (id: string): any => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { contentDocuments } = getState().contentDocument;
        const deletedContentDocument = contentDocuments.get(id);
        if (deletedContentDocument) {
            contentDocuments.delete(id);
            dispatch({ type: 'DELETE_CONTENT_DOCUMENT', deletedContentDocument, contentDocuments: new Map([...contentDocuments]) });
        }
    },
    modifyContentDocument: (contentDocument: IContentDocument): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { contentDocuments } = getState().contentDocument;
            dispatch({
                contentDocuments: new Map([...contentDocuments.set(contentDocument.id, contentDocument)]),
                type: "EDIT_CONTENT_DOCUMENT",
            });
        },
    requestContentDocuments: () => ({ type: 'REQUEST_CONTENT_DOCUMENTS' }),
    saveContentDocument: (contentDocument: IContentDocument): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { contentDocuments } = getState().contentDocument;
            dispatch({ type: 'SAVE_CONTENT_DOCUMENT', savedContentDocument: contentDocument, contentDocuments: new Map([...contentDocuments.set(contentDocument.id, contentDocument)]) });
        }
}