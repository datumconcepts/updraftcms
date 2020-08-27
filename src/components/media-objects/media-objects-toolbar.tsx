import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";

import { Menu, Icon, Breadcrumb, Popup, Modal, Button, Input} from 'semantic-ui-react';

import { IMediaObject, IMediaObjectType } from 'models';

import PageToolbar from 'components/high-order/PageToolbar';

interface IMediaObjectToolbarProps extends RouteComponentProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;

    // onFileUploaded: (file: File) => void;
}
const MediaObjectToolbar: React.FC<IMediaObjectToolbarProps> = ({mediaObjects, selectedMediaObjectId}) => {
    const [modalOpen, toggleModal] = React.useState(false);

    const fileUpload = (files: FileList | null) => {
        if (files) {


            // Add files to Media Object List

            // Handle file upload
        }
    }

    const getSelectedName: () => string = () => {
        const selectedMediaObject = mediaObjects.find(o => o.id === selectedMediaObjectId);
        if (selectedMediaObject) {
            if (selectedMediaObject.objectType === IMediaObjectType.FILE) {
                return selectedMediaObject.parentId || selectedMediaObjectId;
            }
        }
        return selectedMediaObjectId;
    }


    return (<PageToolbar>
        <Menu.Item>
            <Breadcrumb.Section>Media Objects</Breadcrumb.Section>
        </Menu.Item>
        <Menu.Item style={{ flex: 1 }}>
            <Breadcrumb >
                <Breadcrumb.Section>root</Breadcrumb.Section>
                <Breadcrumb.Divider icon={{ name: 'chevron right', color: 'blue' }} />
                <Breadcrumb.Section>{selectedMediaObjectId}</Breadcrumb.Section>
            </Breadcrumb>
        </Menu.Item>

        <Menu.Menu position="right">
            <Popup trigger={
                <Menu.Item icon={true} onClick={() => toggleModal(true)}>
                    <Icon name="folder outline" />
                </Menu.Item >}
                content="Create Folder" position="bottom right" />
            <Popup trigger={
                <Menu.Item icon={true} as="label" htmlFor="upload_file">
                    <Icon name="upload" />
                    <input type="file" style={{ display: 'none' }} id="upload_file" multiple={true} onChange={e => fileUpload(e.target.files)} />
                </Menu.Item>} content="Upload File" position="bottom right" />
        </Menu.Menu>

        <Modal size="mini" open={modalOpen} onClose={() => toggleModal(false)}>
            <Modal.Header>Create New Folder</Modal.Header>
            <Modal.Content>
                <Input placeholder="Folder Name" type="text" fluid={true} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => toggleModal(false)}>Cancel</Button>
                <Button color="blue"
                    content="Create"
                />
            </Modal.Actions>
        </Modal>
    </PageToolbar>);
}

export default withRouter(MediaObjectToolbar);