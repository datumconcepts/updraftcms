
import { AnyAction, Dispatch } from 'redux';

import { KnownAppActions } from 'store/actions';
import { AppMiddlewareApi } from 'store/StoreTypes';

export const middleware = (api: AppMiddlewareApi) =>
    (next: Dispatch<AnyAction>) =>
        (action: KnownAppActions) => {
            switch (action.type) {
               
            }
            return next(action);
        }
