import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import { IMediaObject, IMediaObjectType } from 'src/Types';

import styles from "./MenuStyles";


interface IMediaObjectMenuProps extends RouteComponentProps, WithStyles<typeof styles> {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
}

class MediaObjectMenu extends React.Component<IMediaObjectMenuProps> {

    public getSelectedDirectory: () => string = () => {
        const { mediaObjects, selectedMediaObjectId } = this.props;
        const selectedMediaObject = mediaObjects.find(o => o.id === selectedMediaObjectId);
        if (selectedMediaObject) {
            if (selectedMediaObject.objectType === IMediaObjectType.FILE) {
                return selectedMediaObject.parentId || selectedMediaObjectId;
            }
        }
        return selectedMediaObjectId;
    }

    public render() {
        const { mediaObjects, classes} = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar variant="dense" />
                <TreeView defaultExpandIcon={<FolderIcon />} defaultExpanded={[this.getSelectedDirectory()]}>
                    {
                        ([] as IMediaObject[]).concat(mediaObjects).filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && !dir.parentId).map((dir) => this.getSubDirectories(dir))
                    }
                </TreeView>
            </Drawer>);
    }

    private getSubDirectories = (mediaObject: IMediaObject) => {
        const { mediaObjects, selectedMediaObjectId } = this.props;
        return (<TreeItem nodeId={mediaObject.id} key={mediaObject.id} label={mediaObject.name} icon={mediaObject.id === selectedMediaObjectId ? <FolderOpenIcon /> : <FolderIcon />}>
            {
                mediaObjects.filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && dir.parentId === mediaObject.id).map((dir) => this.getSubDirectories(dir))
            }
        </TreeItem>);
    }


}


const routedMediaObjectMenu = withRouter(MediaObjectMenu);
export default withStyles(styles, { withTheme: true })(routedMediaObjectMenu);