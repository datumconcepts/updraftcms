import { Action } from 'store/actions/node_modules/redux';

import { IAppState } from 'store/State';
import { AppDispatch } from 'store/StoreTypes';

import { IObjectModel } from 'Types';

export const REQUEST_OBJECT_MODELS = 'REQUEST_OBJECT_MODELS';
export const RECEIVE_OBJECT_MODELS = 'RECEIVE_OBJECT_MODELS';
export const EDIT_OBJECT_MODEL = 'EDIT_OBJECT_MODEL';
export const SAVE_OBJECT_MODEL = 'SAVE_OBJECT_MODEL';
export const DELETE_OBJECT_MODEL = 'DELETE_OBJECT_MODEL';




interface IRequestObjectModelsAction extends Action {
    type: typeof REQUEST_OBJECT_MODELS;
}
interface IReceiveObjectModelsAction extends Action {
    type: typeof RECEIVE_OBJECT_MODELS;
    objectModels: Map<string, IObjectModel>;
}
interface IEditObjectModelsAction extends Action {
    type: typeof EDIT_OBJECT_MODEL;
    objectModels: Map<string, IObjectModel>;
}
interface ISaveObjectModelsAction extends Action {
    type: typeof SAVE_OBJECT_MODEL;
    objectModels: Map<string, IObjectModel>;
    savedObjectModel: IObjectModel;
}
interface IDeleteObjectModelsAction extends Action {
    type: typeof DELETE_OBJECT_MODEL;
    objectModels: Map<string, IObjectModel>;
    deletedObjectModel: IObjectModel;
}

export type KnownObjectModelActions = IEditObjectModelsAction | IDeleteObjectModelsAction | IReceiveObjectModelsAction | IRequestObjectModelsAction | ISaveObjectModelsAction;

export const ObjectModelActionCreators = {
    deleteObjectModel: (id: string): any => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { objectModels } = getState().objectModel;
        const deletedObjectModel = objectModels.get(id);
        if (deletedObjectModel) {
            objectModels.delete(id);
            dispatch({ type: 'DELETE_OBJECT_MODEL', deletedObjectModel, objectModels: new Map([...objectModels]) });
        }
    },
    modifyObjectModel: (objectModel: IObjectModel): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { objectModels } = getState().objectModel;
            dispatch({
                objectModels: new Map([...objectModels.set(objectModel.id, objectModel)]),
                type: "EDIT_OBJECT_MODEL",
            });
        },
    requestObjectModels: () => ({ type: 'REQUEST_OBJECT_MODELS' }),
    saveObjectModel: (objectModel: IObjectModel): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { objectModels } = getState().objectModel;
            dispatch({ type: 'SAVE_OBJECT_MODEL', savedObjectModel: objectModel, objectModels: new Map([...objectModels.set(objectModel.id, objectModel)]) });
        }
}