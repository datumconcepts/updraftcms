import { Action } from 'redux';

import { IAppState } from '../State';
import { AppDispatch, AppResult } from '../StoreTypes';


interface IRequestObjectModelsAction extends Action {
    type: 'REQUEST_OBJECT_MODELS';
}
interface IEditObjectModelsAction extends Action {
    type: 'EDIT_OBJECT_MODEL';
}
interface ISaveObjectModelsAction extends Action {
    type: 'SAVE_OBJECT_MODEL';
}
interface IDeleteObjectModelsAction extends Action {
    type: 'DELETE_OBJECT_MODEL';
}

export type KnownObjectModelActions = IEditObjectModelsAction | IDeleteObjectModelsAction | IRequestObjectModelsAction | ISaveObjectModelsAction;

export const ObjectModelActionCreators = {
    deleteObjectModel: (): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        dispatch({ type: 'DELETE_OBJECT_MODEL' });
    },
    editObjectModel: (): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        dispatch({ type: 'EDIT_OBJECT_MODEL' });
    },
    requestObjectModels: () => ({ type: 'REQUEST_OBJECT_MODELS' }),
    saveObjectModel: (): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        dispatch({ type: 'SAVE_OBJECT_MODEL' });
    }
}