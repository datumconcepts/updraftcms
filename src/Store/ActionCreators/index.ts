import { ContentDocumentActionCreators, KnownContentDocumentActions } from './ContentDocument';
import { KnownObjectModelActions, ObjectModelActionCreators } from './ObjectModel';

export type KnownAppActions = KnownObjectModelActions | KnownContentDocumentActions;

export const AppActionsCreators = {
    ContentDocument: ContentDocumentActionCreators,
    ObjectModel: ObjectModelActionCreators
}