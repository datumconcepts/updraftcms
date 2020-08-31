import { IMediaObject, IMediaObjectType } from 'models';

export interface IMediaObjectState {
    isLoading: boolean;
    mediaObjects: Map<string, IMediaObject>;
    selectedMediaObjectId: string;
}


export const defaultMediaObject = {} as IMediaObjectState;

export const unloadedMediaObjectState: IMediaObjectState = {
    isLoading: false, mediaObjects: new Map<string, IMediaObject>([
        ['342', { id: '342', name: '/', objectType: IMediaObjectType.DIRECTORY, path: '/' }],
        ['654', { id: '654', name: 'directory 1', objectType: IMediaObjectType.DIRECTORY, parentId: '342', path: '/directory1' }],
        ['667', { id: '667', name: 'file 4', objectType: IMediaObjectType.FILE, parentId: '654', path: '/file4' }],
        ['345', { id: '345', name: 'directory 2', objectType: IMediaObjectType.DIRECTORY, parentId: '342', path: '/directory2' }],
        ['357', { id: '357', name: 'file 2', objectType: IMediaObjectType.FILE, parentId: '345', path: '/file2' }],
        ['346', { id: '346', name: 'directory 4', objectType: IMediaObjectType.DIRECTORY, parentId: '342', path: '/directory4' }],
        ['347', { id: '347', name: 'file 1', objectType: IMediaObjectType.FILE, parentId: '342', path: '/file1' }],
        ['645', { id: '645', name: 'directory 3', objectType: IMediaObjectType.DIRECTORY, parentId: '345', path: '/directory3' }],
        ['666', { id: '666', name: 'file 3', objectType: IMediaObjectType.FILE, parentId: '645', path: '/file3' }],

    ]), selectedMediaObjectId: '342'
};