import { IContentDocumentState } from './IContentDocument';
import { IMediaObjectState } from './IMediaObject';
import { IObjectModelState } from './IObjectModel';

export interface IAppState {
    objectModel: IObjectModelState
    contentDocument: IContentDocumentState
    mediaObject:IMediaObjectState
}


export { IObjectModelState } from './IObjectModel';
export { IMediaObjectState } from './IMediaObject';
export { IContentDocumentState } from './IContentDocument';