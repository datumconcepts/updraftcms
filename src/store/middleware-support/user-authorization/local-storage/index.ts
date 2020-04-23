
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'store-data/actions';
import { AppMiddlewareApi } from 'store-data/StoreTypes';

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
               
            }
            return next(action);
        }
