import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from 'models';

import { IAppState } from 'store/State';

import UsersToolbar from 'components/users/users-toolbar';
import UsersList from 'components/users/users-list';

import Layout from 'components/layout';

const UsersPage: React.FC = () => {

    const { mediaObjects, selectedMediaObjectId } = useSelector((appState: IAppState) => appState.mediaObject);

    const [mediaObject, updateMediaObject] = React.useState<IUser>();

    const dispatch = useDispatch();

    return (<Layout>
        <UsersToolbar />
        <UsersList />
    </Layout>)
}

export default UsersPage;