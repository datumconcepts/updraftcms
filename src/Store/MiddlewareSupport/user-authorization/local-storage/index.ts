
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'Store/actions';
import { AppMiddlewareApi } from 'Store/StoreTypes';

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
               
            }
            return next(action);
        }
