import { Action, Reducer } from 'redux';

import { KnownObjectModelActions } from '../actions/ObjectModel';
import { IObjectModelState, unloadedObjectModelState } from '../State/IObjectModel';


export const ObjectModelReducer: Reducer<IObjectModelState, Action> = (state, incommingAction) => {
    if (state === undefined) {
        state = unloadedObjectModelState;
    }
    const action = incommingAction as KnownObjectModelActions
    switch (action.type) {
        case "REQUEST_OBJECT_MODELS": return { ...state, isLoading: true };
        case "RECEIVE_OBJECT_MODELS": return { ...state, isLoading: false, objectModels: action.objectModels };
        case "EDIT_OBJECT_MODEL": return { ...state, objectModels: action.objectModels };
        case "SAVE_OBJECT_MODEL": return { ...state, objectModels: action.objectModels };
        case "DELETE_OBJECT_MODEL": return { ...state, objectModels: action.objectModels };
        default: return state;
    }
}