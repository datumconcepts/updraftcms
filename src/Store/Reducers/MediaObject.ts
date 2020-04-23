import { Action, Reducer } from 'store/Reducers/node_modules/redux';

import { KnownMediaObjectActions } from '../actions/MediaObject';
import { IMediaObjectState, unloadedMediaObjectState } from '../State/IMediaObject';


export const MediaObjectReducer: Reducer<IMediaObjectState, Action> = (state, incommingAction) => {
    if (state === undefined) {
        state = unloadedMediaObjectState;
    }
    const action = incommingAction as KnownMediaObjectActions
    switch (action.type) {
        case "REQUEST_MEDIA_OBJECTS": return { ...state, isLoading: true };
        case "RECEIVE_MEDIA_OBJECTS": return { ...state, isLoading: false, mediaObjects: action.mediaObjects };
        case "EDIT_MEDIA_OBJECT": return { ...state, mediaObjects: action.mediaObjects };
        case "SAVE_MEDIA_OBJECT": return { ...state, mediaObjects: action.mediaObjects };
        case "DELETE_MEDIA_OBJECT": return { ...state, mediaObjects: action.mediaObjects };
        case "SELECT_MEDIA_OBJECT": return { ...state, selectedMediaObjectId: action.selectedMediaObjectId };
        default: return state;
    }
}