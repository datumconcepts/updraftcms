import * as React from 'react';
import { Segment, Sidebar} from 'semantic-ui-react';



import { IMediaObject } from 'models';

import MediaObjectToolbar from './media-objects-toolbar';

import MediaObjectMenu from './MediaObjectMenu';
import AppContent from 'components/high-order/AppContent';
import EmptyListDisplay from 'components/high-order/EmptyListDisplay';


interface IMediaObjectListProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
    setSelectedMediaObject(id: string): void;
}

const MediaObjectList: React.FC<IMediaObjectListProps> = ({ mediaObjects, selectedMediaObjectId, setSelectedMediaObject }) => {

    return (
        <>
            
            <MediaObjectToolbar selectedMediaObjectId={selectedMediaObjectId}  />
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

export default MediaObjectList;