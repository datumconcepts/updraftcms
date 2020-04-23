import React from 'react';
import { Menu, Breadcrumb, Icon } from 'semantic-ui-react';

import PageToolbar from 'Presentation/HOC/PageToolbar';

interface IContentDocumentEditToolbarProps {
    cloneContentDocument: () => void;
    saveContentDocument: () => void;
    deleteContentDocument: () => void;
    closeContentDocument: () => void;
    isNew: boolean;
}

const ContentDocumentEditToolbar: React.FC<IContentDocumentEditToolbarProps> = ({ cloneContentDocument, saveContentDocument, deleteContentDocument, closeContentDocument, isNew }) => {

    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Content Documents</Breadcrumb.Section>
            <Breadcrumb.Divider icon={{ name: 'angle right' }}></Breadcrumb.Divider>
            <Breadcrumb.Section>Edit</Breadcrumb.Section></Menu.Item>
        <Menu.Menu position="right">
            {
                !isNew && <Menu.Item icon={true} onClick={cloneContentDocument}>
                    <Icon name="copy outline" color="blue" />
                </Menu.Item>
            }
            <Menu.Item icon={true} onClick={saveContentDocument}>
                <Icon name="save" color="blue" />
            </Menu.Item>
            {
                !isNew && <Menu.Item onClick={deleteContentDocument}>
                    <Icon name="trash alternate outline" color="red" />
                </Menu.Item>
            }
            <Menu.Item onClick={closeContentDocument}>
                <Icon name="close" />
            </Menu.Item>
        </Menu.Menu>
    </PageToolbar>
}

export default ContentDocumentEditToolbar;