import { Action, Reducer } from 'redux';

import { KnownObjectModelActions } from '../ActionCreators/ObjectModel';
import { IObjectModelState, unloadedObjectModelState } from '../State/IObjectModel';


export const ObjectModelReducer: Reducer<IObjectModelState, Action> = (state, incommingAction) => {
    if (state === undefined) {
        state = unloadedObjectModelState;
    }
    const action = incommingAction as KnownObjectModelActions
    switch (action.type) {
        case "REQUEST_OBJECT_MODELS":
            return {
                ...state, isLoading: true
            };
        case "EDIT_OBJECT_MODEL": return { ...state, objectModels: action.objectModels };
        case "SAVE_OBJECT_MODEL":
            return {
                ...state,
            };
        case "DELETE_OBJECT_MODEL":
            return {
                ...state,
            };
        default:
            return state;
    }
}