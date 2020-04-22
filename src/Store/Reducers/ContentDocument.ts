import { Action, Reducer } from 'redux';

import { KnownContentDocumentActions } from 'Store/actions/ContentDocument';
import { IContentDocumentState, unloadedContentDocumentState } from 'Store/State/IContentDocument';


export const ContentDocumentReducer: Reducer<IContentDocumentState, Action> = (state, incommingAction) => {
    if (state === undefined) {
        state = unloadedContentDocumentState;
    }
    const action = incommingAction as KnownContentDocumentActions
    switch (action.type) {
        case "REQUEST_CONTENT_DOCUMENTS": return { ...state, isLoading: true };
        case "RECEIVE_CONTENT_DOCUMENTS": return { ...state, isLoading: false, contentDocuments: action.contentDocuments };
        case "EDIT_CONTENT_DOCUMENT": return { ...state, contentDocuments: action.contentDocuments };
        case "SAVE_CONTENT_DOCUMENT": return { ...state, contentDocuments: action.contentDocuments };
        case "DELETE_CONTENT_DOCUMENT": return { ...state, contentDocuments: action.contentDocuments };
        default: return state;
    }
}