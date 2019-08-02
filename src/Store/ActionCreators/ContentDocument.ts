import { Action } from 'redux';

import { IAppState } from 'src/Store/State';
import { AppDispatch, AppResult } from 'src/Store/StoreTypes';

import { IContentDocument } from 'src/Types';

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
}
interface IDeleteContentDocumentsAction extends Action {
    type: 'DELETE_CONTENT_DOCUMENT';
    contentDocuments: Map<string, IContentDocument>;
}

export type KnownContentDocumentActions = IEditContentDocumentsAction | IDeleteContentDocumentsAction | IReceiveContentDocumentsAction | IRequestContentDocumentsAction | ISaveContentDocumentsAction;

export const ContentDocumentActionCreators = {
    deleteContentDocument: (id: string): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { contentDocuments } = getState().contentDocument;
        contentDocuments.delete(id);
        dispatch({ type: 'DELETE_CONTENT_DOCUMENT', contentDocuments: new Map([...contentDocuments]) });
    },
    modifyContentDocument: (contentDocument: IContentDocument): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { contentDocuments } = getState().contentDocument;
            dispatch({
                contentDocuments: new Map([...contentDocuments.set(contentDocument.id, contentDocument)]),
                type: "EDIT_CONTENT_DOCUMENT",
            });
        },
    requestContentDocuments: () => ({ type: 'REQUEST_CONTENT_DOCUMENTS' }),
    saveContentDocument: (contentDocument: IContentDocument): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { contentDocuments } = getState().contentDocument;
            dispatch({ type: 'SAVE_CONTENT_DOCUMENT', contentDocuments: new Map([...contentDocuments.set(contentDocument.id, contentDocument)]) });
        }
}