import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";


import { IMediaObject, IMediaObjectType } from 'Types';
import { Sidebar, Menu, Icon, List, Segment } from 'semantic-ui-react';



interface IMediaObjectMenuProps extends RouteComponentProps {
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
        const { mediaObjects } = this.props;
        return (
            <Sidebar visible={true}>
                <Segment circular={false}>
                    <List>
                        {
                            ([] as IMediaObject[]).concat(mediaObjects).filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && !dir.parentId).map((dir) => this.getSubDirectories(dir))
                        }
                    </List>
                </Segment>
            </Sidebar>);
    }

    private getSubDirectories = (mediaObject: IMediaObject) => {
        const { mediaObjects } = this.props;
        const childItems = mediaObjects.filter(dir => dir.objectType === IMediaObjectType.DIRECTORY && dir.parentId === mediaObject.id);
        const isSelected = mediaObject.id === this.getSelectedDirectory();
        return (
            <List.Item key={mediaObject.id}>
                <List.Icon name={isSelected ? "folder open" : "folder"} />
                <List.Content>
                    <List.Header>{mediaObject.name}</List.Header>
                </List.Content>
                {
                    childItems.length > 0 && < List.List >
                        {
                            childItems.map((dir) => this.getSubDirectories(dir))
                        }
                    </List.List>
                }
            </List.Item>);
    }


}


export default withRouter(MediaObjectMenu);