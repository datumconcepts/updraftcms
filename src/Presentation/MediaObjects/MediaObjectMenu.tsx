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
    setSelectedMediaObject(id: string): void;
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
        const { mediaObjects, classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar variant="dense" />
                <TreeView defaultExpanded={[this.getSelectedDirectory()]} onNodeToggle={nodeId => this.props.setSelectedMediaObject(nodeId)}>
                    {
                        ([] as IMediaObject[]).concat(mediaObjects).filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && !dir.parentId).map((dir) => this.getSubDirectories(dir))
                    }
                </TreeView>
            </Drawer>);
    }

    private getSubDirectories = (mediaObject: IMediaObject) => {
        const { mediaObjects} = this.props;
        const childItems = mediaObjects.filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && dir.parentId === mediaObject.id);
        const isSelected = mediaObject.id === this.getSelectedDirectory();
        return (
            <TreeItem onSelect={} key={mediaObject.id} nodeId={mediaObject.id} label={mediaObject.name} icon={isSelected ? (<FolderOpenIcon />) : (<FolderIcon />)}>
                {
                    childItems.map((dir) => this.getSubDirectories(dir))
                }
            </TreeItem>);
    }


}


const routedMediaObjectMenu = withRouter(MediaObjectMenu);
export default withStyles(styles, { withTheme: true })(routedMediaObjectMenu);