import React from 'react';
import { Menu, Breadcrumb, Icon, Popup } from 'semantic-ui-react';

import useShortcuts from 'hooks/useShortcuts';
import PageToolbar from 'components/high-order/PageToolbar';

interface IContentDocumentEditToolbarProps {
    cloneContentDocument: () => void;
    saveContentDocument: () => void;
    deleteContentDocument: () => void;
    closeContentDocument: () => void;
    isNew: boolean;
}

const ContentDocumentEditToolbar: React.FC<IContentDocumentEditToolbarProps> = ({ cloneContentDocument, saveContentDocument, deleteContentDocument, closeContentDocument, isNew }) => {

    useShortcuts([
        { key: 's', action: saveContentDocument },
        { key: 'd', action: deleteContentDocument },
        { key: 'q', action: closeContentDocument },
        { key: 'a', action: cloneContentDocument }
    ]);
    return <PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Content Documents</Breadcrumb.Section>
            <Breadcrumb.Divider icon={{ name: 'angle right' }}></Breadcrumb.Divider>
            <Breadcrumb.Section>Edit</Breadcrumb.Section></Menu.Item>
        <Menu.Menu position="right">
            {
                !isNew && <Popup trigger={<Menu.Item icon={true} onClick={cloneContentDocument}>
                    <Icon name="clone outline" color="blue" />
                </Menu.Item>} content={<>Clone <b>(ctrl+ a)</b></>} position="bottom right" />
            }
            <Popup trigger={<Menu.Item icon={true} onClick={saveContentDocument}>
                <Icon name="save" color="blue" />
            </Menu.Item>} content={<>Save <b>(ctrl+ s)</b></>} position="bottom right" />
            {
                !isNew && <Popup trigger={<Menu.Item onClick={deleteContentDocument}>
                    <Icon name="trash alternate outline" color="red" />
                </Menu.Item>} content={<>Delete <b>(ctrl+ d)</b></>} position="bottom right" />
            }
            <Popup trigger={<Menu.Item onClick={closeContentDocument}>
                <Icon name="close" />
            </Menu.Item>} content={<>Close <b>(ctrl+ q)</b></>} position="bottom right" />
        </Menu.Menu>
    </PageToolbar>
}

export default ContentDocumentEditToolbar;