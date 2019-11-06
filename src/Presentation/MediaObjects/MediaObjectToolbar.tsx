import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { Button, ButtonGroup, Toolbar, } from '@material-ui/core';

import CreateFolderIcon from '@material-ui/icons/CreateNewFolder';
import CreateFileIcon from '@material-ui/icons/NoteAdd';

import styles from "./ToobarStyles";

interface IMediaObjectToolbarProps extends RouteComponentProps, WithStyles<typeof styles> {
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
        const { classes } = this.props;
        return (<>
            <Toolbar variant="dense" className={classes.root} >
                <ButtonGroup>
                    <Button >
                        <CreateFolderIcon />
                    </Button>
                    <Button component="label">
                        <CreateFileIcon />
                        <input type="file" style={{ display: 'none' }} multiple={true} onChange={e => this.fileUpload(e.target.files)} />
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </>);
    }

}

const routedMediaObjectToolbar = withRouter(MediaObjectToolbar);
export default withStyles(styles, { withTheme: true })(routedMediaObjectToolbar);