
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'src/Store/ActionCreators';
import { AppMiddlewareApi } from 'src/Store/StoreTypes';
// import { IContentDocument, IObjectModel } from 'src/Types';

// const ContentocumentKey = "_content_dcuments";
// const ObjectModelKey = "_object_models";

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
               
            }
            return next(action);
        }
