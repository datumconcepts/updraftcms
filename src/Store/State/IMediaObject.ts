import { IMediaObject, IMediaObjectType } from 'src/Types';

export interface IMediaObjectState {
    isLoading: boolean;
    mediaObjects: Map<string, IMediaObject>;
    selectedMediaObjectId: string;
}


export const defaultMediaObject = {} as IMediaObjectState;

export const unloadedMediaObjectState: IMediaObjectState = {
    isLoading: false, mediaObjects: new Map<string, IMediaObject>([
        ['342', { id: '342', name: 'base directory', objectType: IMediaObjectType.DIRECTORY, path: '/' }],
        ['654', { id: '654', name: 'directory 1', objectType: IMediaObjectType.DIRECTORY, parentId: '342', path: '/dir1' }],
        ['345', { id: '345', name: 'directory 2', objectType: IMediaObjectType.DIRECTORY, parentId: '342', path: '/dir2' }],
        ['645', { id: '645', name: 'directory 3', objectType: IMediaObjectType.DIRECTORY, parentId: '345', path: '/dir3' }],

    ]), selectedMediaObjectId: '342'
};