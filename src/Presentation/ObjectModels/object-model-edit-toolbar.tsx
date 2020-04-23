import React from 'react';
import { Menu, Breadcrumb, Icon } from 'semantic-ui-react';

import PageToolbar from 'Presentation/HOC/PageToolbar';

interface IObjectModelEditToolbarProps {
    cloneObjectModel: () => void;
    saveObjectModel: () => void;
    deleteObjectModel: () => void;
    closeObjectModel: () => void;
    isNew: boolean;
}

const ObjectModelEditToolbar: React.FC<IObjectModelEditToolbarProps> = ({ cloneObjectModel, saveObjectModel, deleteObjectModel, closeObjectModel, isNew }) => {

    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Object Models</Breadcrumb.Section>
            <Breadcrumb.Divider icon={{ name: 'angle right' }}></Breadcrumb.Divider>
            <Breadcrumb.Section>Edit</Breadcrumb.Section></Menu.Item>
        <Menu.Menu position="right">
            {
                !isNew && <Menu.Item icon={true} onClick={cloneObjectModel}>
                    <Icon name="copy outline" color="blue" />
                </Menu.Item>
            }
            <Menu.Item icon={true} onClick={saveObjectModel}>
                <Icon name="save" color="blue" />
            </Menu.Item>
            {
                !isNew && <Menu.Item onClick={deleteObjectModel}>
                    <Icon name="trash alternate outline" color="red" />
                </Menu.Item>
            }
            <Menu.Item onClick={closeObjectModel}>
                <Icon name="close" />
            </Menu.Item>
        </Menu.Menu>
    </PageToolbar>
}

export default ObjectModelEditToolbar;