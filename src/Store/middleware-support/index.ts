import { middleware as dataPersistence } from './data-persistence';
import { middleware as userAuthorization } from './user-authorization/local-storage';

export const AppMiddleware = {
    dataPersistence,
    userAuthorization
}