import React from 'react';
import { Menu, Breadcrumb, Icon } from 'semantic-ui-react';
import PageToolbar from 'components/high-order/PageToolbar';


interface IContentDocumentListToolbarProps {
    addContentDocument: () => void;
}

const ContentDocumentListToolbar: React.FC<IContentDocumentListToolbarProps> = ({ addContentDocument }) => {

    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Content Documents</Breadcrumb.Section>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item icon={true} onClick={addContentDocument}>
                <Icon name="add" color="blue" />
            </Menu.Item>
        </Menu.Menu>
    </PageToolbar>
}

export default ContentDocumentListToolbar;