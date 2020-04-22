import { ContentDocumentActionCreators, KnownContentDocumentActions } from './ContentDocument';
import { KnownMediaObjectActions } from './MediaObject';
import { KnownObjectModelActions, ObjectModelActionCreators } from './ObjectModel';

export type KnownAppActions = KnownObjectModelActions | KnownContentDocumentActions | KnownMediaObjectActions;

export const AppActionsCreators = {
    ContentDocument: ContentDocumentActionCreators,
    ObjectModel: ObjectModelActionCreators
}