import { Action } from 'redux';

import { IAppState } from '../State';
import { AppDispatch, AppResult } from '../StoreTypes';

import { IObjectModel } from 'src/Types';

interface IRequestObjectModelsAction extends Action {
    type: 'REQUEST_OBJECT_MODELS';
}
interface IEditObjectModelsAction extends Action {
    type: 'EDIT_OBJECT_MODEL';
    objectModels: Map<string, IObjectModel>;
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
    // editObjectModel: (id?: string): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
    //     const { objectModels } = getState().objectModel;
    //     if(!objectModels){
    //         return;
    //     }
    //     if (!id) {
    //         id = guid().replace(/-/g, "");
    //         dispatch({ type: 'EDIT_OBJECT_MODEL', selectedObjectModelId: id, objectModels: new Map([...objectModels.set(id, { ...defaultObjectModel, id })]) });
    //     }
    //     else{
    //         dispatch({ type: 'EDIT_OBJECT_MODEL', selectedObjectModelId: id, objectModels: new Map([...objectModels]) });
    //     }
    // },
    modifyObjectModel: (objectModel: IObjectModel, name: string, value: any): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { objectModels } = getState().objectModel;
            // const objectModel = objectModels.get(selectedObjectModelId) as IObjectModel;
            dispatch({
                objectModels: new Map([...objectModels.set(objectModel.id, { ...objectModel, [name]: value })]),
                type: "EDIT_OBJECT_MODEL",
            });
        },
    requestObjectModels: () => ({ type: 'REQUEST_OBJECT_MODELS' }),
    saveObjectModel: (): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        dispatch({ type: 'SAVE_OBJECT_MODEL' });
    }
}