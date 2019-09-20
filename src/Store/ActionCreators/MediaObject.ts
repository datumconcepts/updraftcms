import { Action } from 'redux';

import { IAppState } from '../State';
import { AppDispatch, AppResult } from '../StoreTypes';

import { IMediaObject } from 'src/Types';

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

export type KnownMediaObjectActions = IEditMediaObjectsAction | IDeleteMediaObjectsAction | IReceiveMediaObjectsAction | IRequestMediaObjectsAction | ISaveMediaObjectsAction;

export const MediaObjectActionCreators = {
    deletemediaObject: (id: string): AppResult<void> => (dispatch: AppDispatch, getState: () => IAppState) => {
        const { mediaObjects } = getState().mediaObject;
        mediaObjects.delete(id);
        dispatch({ type: 'DELETE_MEDIA_OBJECT', mediaObjects: new Map([...mediaObjects]) });
    },
    modifymediaObject: (mediaObject: IMediaObject): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { mediaObjects } = getState().mediaObject;
            dispatch({
                mediaObjects: new Map([...mediaObjects.set(mediaObject.id, mediaObject)]),
                type: "EDIT_MEDIA_OBJECT",
            });
        },
    requestmediaObjects: () => ({ type: 'REQUEST_MEDIA_OBJECTS' }),
    savemediaObject: (mediaObject: IMediaObject): AppResult<void> =>
        (dispatch: AppDispatch, getState: () => IAppState) => {
            const { mediaObjects } = getState().mediaObject;
            dispatch({ type: 'SAVE_MEDIA_OBJECT', mediaObjects: new Map([...mediaObjects.set(mediaObject.id, mediaObject)]) });
        }
}