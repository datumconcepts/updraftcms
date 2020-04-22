import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";

import { Menu, Icon } from 'semantic-ui-react';

interface IMediaObjectToolbarProps extends RouteComponentProps {
    selectedMediaObjectId: string;

    // onFileUploaded: (file: File) => void;
}
class MediaObjectToolbar extends React.Component<IMediaObjectToolbarProps> {

    public fileUpload = (files: FileList | null) => {
        if (files) {


            // Add files to Media Object List

            // Handle file upload
        }
    }

    public render() {
        return (<>
            <Menu attached="top" color="olive" inverted={true}>
                    <Menu.Item icon={true}>
                    <Icon name="folder" />
                </Menu.Item >
                <Menu.Item icon={true}>
                    <Icon name="file" />
                    <input type="file" style={{ display: 'none' }} multiple={true} onChange={e => this.fileUpload(e.target.files)} />
                </Menu.Item>
            </Menu>
        </>);
    }

}

export default withRouter(MediaObjectToolbar);