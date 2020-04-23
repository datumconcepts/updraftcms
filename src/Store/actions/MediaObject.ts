import { Action } from 'store/actions/node_modules/redux';
import { IMediaObject } from 'Types';


export const REQUEST_MEDIA_OBJECTS = 'REQUEST_MEDIA_OBJECTS';
export const RECEIVE_MEDIA_OBJECTS = 'RECEIVE_MEDIA_OBJECTS';
export const EDIT_MEDIA_OBJECT = 'EDIT_MEDIA_OBJECT';
export const SAVE_MEDIA_OBJECT = 'SAVE_MEDIA_OBJECT';
export const DELETE_MEDIA_OBJECT = 'DELETE_MEDIA_OBJECT';
export const SELECT_MEDIA_OBJECT = 'SELECT_MEDIA_OBJECT';


interface IRequestMediaObjectsAction extends Action {
    type: typeof REQUEST_MEDIA_OBJECTS;
}
interface IReceiveMediaObjectsAction extends Action {
    type: typeof RECEIVE_MEDIA_OBJECTS;
    mediaObjects: Map<string, IMediaObject>;
}
interface IEditMediaObjectsAction extends Action {
    type: typeof EDIT_MEDIA_OBJECT;
    mediaObjects: Map<string, IMediaObject>;
}
interface ISaveMediaObjectsAction extends Action {
    type: typeof SAVE_MEDIA_OBJECT;
    mediaObjects: Map<string, IMediaObject>;
}
interface IDeleteMediaObjectsAction extends Action {
    type: typeof DELETE_MEDIA_OBJECT;
    mediaObjects: Map<string, IMediaObject>;
}
interface ISelectMediaObject extends Action {
    type: typeof SELECT_MEDIA_OBJECT;
    selectedMediaObjectId: string;
}

export type KnownMediaObjectActions = IEditMediaObjectsAction | IDeleteMediaObjectsAction | IReceiveMediaObjectsAction | IRequestMediaObjectsAction | ISaveMediaObjectsAction | ISelectMediaObject;
