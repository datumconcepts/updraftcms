import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router";



import { IMediaObject } from 'Types';

import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

// import MediaObjectMenu from './MediaObjectMenu';
import MediaObjectToolbar from './MediaObjectToolbar';

import { Segment, Sidebar } from 'semantic-ui-react';
import MediaObjectMenu from './MediaObjectMenu';


interface IMediaObjectListProps extends RouteComponentProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
    setSelectedMediaObject(id: string): void;
}

class MediaObjectList extends React.Component<IMediaObjectListProps> {

    public render() {
        const { mediaObjects, selectedMediaObjectId, setSelectedMediaObject } = this.props;
        return (
            <>
                <MediaObjectToolbar selectedMediaObjectId={selectedMediaObjectId} />
                <Sidebar.Pushable as={Segment} className="workspace" attached={true}>
                    <MediaObjectMenu mediaObjects={mediaObjects} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={setSelectedMediaObject} />
                    <Sidebar.Pusher>
                        <AppContent>
                            {mediaObjects.length === 0 ? (
                                <EmptyListDisplay
                                    clickHandler={() => false}
                                    title="It looks like you have no media objects yet. Click here to add a new one"
                                />
                            ) : (
                                    <div>Here is the content library</div>
                                )
                            }
                        </AppContent>
                    </Sidebar.Pusher>
                </Sidebar.Pushable></>
        )
    }

}

export default withRouter(MediaObjectList)