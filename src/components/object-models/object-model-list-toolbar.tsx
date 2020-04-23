import React from 'react';
import { Menu, Breadcrumb, Icon } from 'semantic-ui-react';

import PageToolbar from 'components/high-order/PageToolbar';


interface IObjectModelListToolbarProps {
    addObjectModel: () => void;
}

const ObjectModelListToolbar: React.FC<IObjectModelListToolbarProps> = ({ addObjectModel }) => {

    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Object Models</Breadcrumb.Section>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item icon={true} onClick={addObjectModel}>
                <Icon name="add" color="blue" />
            </Menu.Item>
        </Menu.Menu>
    </PageToolbar>
}

export default ObjectModelListToolbar;