import { Dispatch, MiddlewareAPI } from 'store/node_modules/redux';
import { ThunkAction, ThunkDispatch } from 'store/node_modules/redux-thunk';

import { KnownAppActions } from './actions';
import { IAppState } from './State';

export type AppResult<Result> = ThunkAction<Result, IAppState, undefined, KnownAppActions>
export type AppDispatch = ThunkDispatch<IAppState, undefined, KnownAppActions>
export type AppMiddlewareApi = MiddlewareAPI<Dispatch<KnownAppActions>, IAppState>