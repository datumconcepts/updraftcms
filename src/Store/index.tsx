import * as React from "store/node_modules/react";

import { Provider } from 'store/node_modules/react-redux';

import thunk from 'store/node_modules/redux-thunk';

import { applyMiddleware, combineReducers, createStore, Store, } from 'store/node_modules/redux';

import { AppMiddleware } from './middleware-support';
import { AppReducers } from './Reducers';

import { IDataPersistenceMiddleware } from './middleware-support/data-persistence';


export interface IUpdraftStoreProps {
    DataPersistenceMiddleware: IDataPersistenceMiddleware;
}

export default class UpdraftStore extends React.Component<IUpdraftStoreProps>{
    public render() {
        const { children } = this.props;
        return <Provider store={this.getStore()}>{children}</Provider>;
    }
    private getStore: () => Store = () => {
        const { DataPersistenceMiddleware } = this.props;
        return createStore(
            combineReducers(AppReducers),
            applyMiddleware(
                thunk,
                AppMiddleware.dataPersistence(DataPersistenceMiddleware)
            )
        );
    }
}