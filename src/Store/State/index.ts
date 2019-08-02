import { IContentDocumentState } from './IContentDocument';
import { IObjectModelState } from './IObjectModel';

export interface IAppState {
    objectModel: IObjectModelState
    contentDocument: IContentDocumentState
}


export { IObjectModelState } from './IObjectModel';
export { IContentDocumentState } from './IContentDocument';