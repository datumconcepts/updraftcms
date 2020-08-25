import * as React from 'react';
import { Sidebar, List, Segment, Button, Icon, Grid } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from "react-router-dom";


import { IMediaObject, IMediaObjectType } from 'models';

import "./Hover.css";

interface IMediaObjectMenuProps extends RouteComponentProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
    setSelectedMediaObject(id: string): void;
}

const MediaObjectMenu: React.FC<IMediaObjectMenuProps> = ({ mediaObjects, selectedMediaObjectId, setSelectedMediaObject }) => {

    const getSelectedDirectory: () => string = () => {
        const selectedMediaObject = mediaObjects.find(o => o.id === selectedMediaObjectId);
        if (selectedMediaObject) {
            if (selectedMediaObject.objectType === IMediaObjectType.FILE) {
                return selectedMediaObject.parentId || selectedMediaObjectId;
            }
        }
        return selectedMediaObjectId;
    }

    const rootDir = ([] as IMediaObject[]).concat(mediaObjects).find(dir => (dir.objectType === IMediaObjectType.DIRECTORY || dir.objectType === IMediaObjectType.FILE) && !dir.parentId)

    const getSubDirectories = (mediaObject: IMediaObject) => {
        const childItems = mediaObjects.filter(dir => (dir.objectType === IMediaObjectType.DIRECTORY || dir.objectType === IMediaObjectType.FILE) && dir.parentId === mediaObject.id);
        const isSelected = mediaObject.id === getSelectedDirectory();
        return (
            <List.Item key={mediaObject.id}>
                <List.Icon name={isSelected ? "folder open" : "folder"} />
                <List.Content >
                    <Grid className="parent" columns="equal" verticalAlign='middle' style={{ margin: "-3px" }}>
                        <Grid.Column style={{ padding: "3px" }}>
                            <List.Header>{mediaObject.name}</List.Header>
                        </Grid.Column>
                        <Grid.Column className="child" verticalAlign='middle' style={{ flex: "0 0 auto", width: "auto", padding: "3px" }}>
                            <Icon name='edit' style={{ fontSize: "inherit" }} />
                            <Icon name='delete' style={{ fontSize: "inherit", margin: 0 }} />
                        </Grid.Column>
                    </Grid>
                    {childItems.length > 0 && <List.List style={{ width: "100%" }}>
                        {childItems.map((dir) => getSubDirectories(dir))}
                    </List.List>}
                </List.Content>
            </List.Item>);
    }

    return (
        <Sidebar visible={true}>
            <Segment circular={false}>
                {rootDir &&
                    <List>
                        {
                            ([] as IMediaObject[]).concat(mediaObjects).filter(dir => (dir.objectType === IMediaObjectType.DIRECTORY || dir.objectType === IMediaObjectType.FILE) && dir.parentId === rootDir.id).map((dir) => getSubDirectories(dir))
                        }
                    </List>}
            </Segment>
        </Sidebar>
    )
}


export default withRouter(MediaObjectMenu);