import { Action } from 'redux';

import { IAppState } from '../State';
import { AppDispatch, AppResult } from '../StoreTypes';

import { IObjectModel } from 'src/Types';

interface IRequestObjectModelsAction extends Action {
    type: 'REQUEST_OBJECT_MODELS';
}
interface IReceiveObjectModelsAction extends Action {
    type: 'RECEIVE_OBJECT_MODELS';
    objectModels: Map<string, IObjectModel>;
}
interface IEditObjectModelsAction extends Action {
    type: 'EDIT_OBJECT_MODEL';
    objectModels: Map<string, IObjectModel>;
}
interface ISaveObjectModelsAction extends Action {
    type: 'SAVE_OBJECT_MODEL';
    objectModels: Map<string, IObjectModel>;
}
interface IDeleteObjectModelsAction extends Action {
    type: 'DELETE_OBJECT_MODEL';
    objectModels: Map<string, IObjectModel>;
}

export type KnownObjectModelActions = IEditObjectModelsAction | IDeleteObjectModelsAction | IReceiveObjectModelsAction | IRequestObjectModelsAction | ISaveObjectModelsAction;

export const ObjectModelActionCreators = {
    deleteObjectModel: (id: string): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { objectModels } = getState().objectModel;
        objectModels.delete(id);
        dispatch({ type: 'DELETE_OBJECT_MODEL', objectModels: new Map([...objectModels]) });
    },
    modifyObjectModel: (objectModel: IObjectModel): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { objectModels } = getState().objectModel;
            dispatch({
                objectModels: new Map([...objectModels.set(objectModel.id, objectModel)]),
                type: "EDIT_OBJECT_MODEL",
            });
        },
    requestObjectModels: () => ({ type: 'REQUEST_OBJECT_MODELS' }),
    saveObjectModel: (objectModel: IObjectModel): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { objectModels } = getState().objectModel;
            dispatch({ type: 'SAVE_OBJECT_MODEL', objectModels: new Map([...objectModels.set(objectModel.id, objectModel)]) });
        }
}