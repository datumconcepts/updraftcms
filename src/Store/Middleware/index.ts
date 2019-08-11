import thunk from 'redux-thunk';
import { middleware as dataPersistence } from './data-persistence/local-storage';
import { middleware as userAuthorization } from './user-authorization/local-storage';

export const AppMiddleware = [
    thunk,
    dataPersistence,
    userAuthorization
];