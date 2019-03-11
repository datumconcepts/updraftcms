import {  applyMiddleware, combineReducers, createStore, } from 'redux';

import { AppMiddleware } from './Middleware';
import { AppReducers } from './Reducers';

export const store = createStore(
    combineReducers(AppReducers),
    applyMiddleware(...AppMiddleware)
);
