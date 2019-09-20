import { Action, Reducer } from 'redux';

import { KnownMediaObjectActions } from '../ActionCreators/MediaObject';
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
        default: return state;
    }
}