import { KnownContentDocumentActions } from './ContentDocument';
import { KnownMediaObjectActions } from './MediaObject';
import { KnownObjectModelActions } from './ObjectModel';

export type KnownAppActions = KnownObjectModelActions | KnownContentDocumentActions | KnownMediaObjectActions;

