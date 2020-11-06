import React from 'react';
import { Menu, Breadcrumb } from 'semantic-ui-react';

import PageToolbar from 'components/high-order/PageToolbar';


const UsersToolbar: React.FC = () => {

    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Users</Breadcrumb.Section>
        </Menu.Item>
    </PageToolbar>
}

export default UsersToolbar;