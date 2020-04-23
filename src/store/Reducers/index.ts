import { ContentDocumentReducer } from './ContentDocument';
import { MediaObjectReducer } from './MediaObject';
import { ObjectModelReducer } from './ObjectModel';

export const AppReducers = {
    contentDocument: ContentDocumentReducer,
    mediaObject: MediaObjectReducer,
    objectModel: ObjectModelReducer,
}