import thunk from 'redux-thunk';
import { middleware as dataPersistence } from './data-persistence/local-storage';

export const AppMiddleware = [
    thunk,
    dataPersistence
];