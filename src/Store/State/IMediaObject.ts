import {  IMediaObject } from 'src/Types';

export interface IMediaObjectState {
    isLoading: boolean;
    mediaObjects: Map<string, IMediaObject>;
    selectedMediaObjectId?: string;
}


export const defaultMediaObject = {  } as IMediaObjectState;

export const unloadedMediaObjectState: IMediaObjectState = { isLoading: false, mediaObjects: new Map<string,IMediaObject>() };