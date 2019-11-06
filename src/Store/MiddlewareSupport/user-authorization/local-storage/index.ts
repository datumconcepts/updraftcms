
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'src/Store/ActionCreators';
import { AppMiddlewareApi } from 'src/Store/StoreTypes';

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
               
            }
            return next(action);
        }
