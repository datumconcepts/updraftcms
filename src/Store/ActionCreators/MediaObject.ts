import { Action } from 'redux';

import { IAppState } from 'Store/State';
import { AppDispatch } from 'Store/StoreTypes';

import { IMediaObject } from 'Types';

interface IRequestMediaObjectsAction extends Action {
    type: 'REQUEST_MEDIA_OBJECTS';
}
interface IReceiveMediaObjectsAction extends Action {
    type: 'RECEIVE_MEDIA_OBJECTS';
    mediaObjects: Map<string, IMediaObject>;
}
interface IEditMediaObjectsAction extends Action {
    type: 'EDIT_MEDIA_OBJECT';
    mediaObjects: Map<string, IMediaObject>;
}
interface ISaveMediaObjectsAction extends Action {
    type: 'SAVE_MEDIA_OBJECT';
    mediaObjects: Map<string, IMediaObject>;
}
interface IDeleteMediaObjectsAction extends Action {
    type: 'DELETE_MEDIA_OBJECT';
    mediaObjects: Map<string, IMediaObject>;
}
interface ISelectMediaObject extends Action {
    type: 'SELECT_MEDIA_OBJECT';
    selectedMediaObjectId: string;
}

export type KnownMediaObjectActions = IEditMediaObjectsAction | IDeleteMediaObjectsAction | IReceiveMediaObjectsAction | IRequestMediaObjectsAction | ISaveMediaObjectsAction | ISelectMediaObject;

export const MediaObjectActionCreators = {
    deletemediaObject: (id: string): any => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { mediaObjects } = getState().mediaObject;
        mediaObjects.delete(id);
        dispatch({ type: 'DELETE_MEDIA_OBJECT', mediaObjects: new Map([...mediaObjects]) });
    },
    modifymediaObject: (mediaObject: IMediaObject): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { mediaObjects } = getState().mediaObject;
            dispatch({
                mediaObjects: new Map([...mediaObjects.set(mediaObject.id, mediaObject)]),
                type: "EDIT_MEDIA_OBJECT",
            });
        },
    requestmediaObjects: () => ({ type: 'REQUEST_MEDIA_OBJECTS' }),
    savemediaObject: (mediaObject: IMediaObject): any =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { mediaObjects } = getState().mediaObject;
            dispatch({ type: 'SAVE_MEDIA_OBJECT', mediaObjects: new Map([...mediaObjects.set(mediaObject.id, mediaObject)]) });
        },

    setSelectedMediaObject: (id: string) => ({ type: 'SELECT_MEDIA_OBJECT', selectedMediaObjectId: id })
}