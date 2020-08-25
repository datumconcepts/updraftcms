import * as React from 'react';
import { Segment, Sidebar, Grid, Icon, Input } from 'semantic-ui-react';

import { IMediaObject, IMediaObjectType } from 'models';

import MediaObjectToolbar from './media-objects-toolbar';

import "./Hover.css";

import MediaObjectMenu from './MediaObjectMenu';
import AppContent from 'components/high-order/AppContent';
import EmptyListDisplay from 'components/high-order/EmptyListDisplay';


interface IMediaObjectListProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
    setSelectedMediaObject(id: string): void;
}

const MediaObjectList: React.FC<IMediaObjectListProps> = ({ mediaObjects, selectedMediaObjectId, setSelectedMediaObject }) => {

    const [editField, setEditField] = React.useState(-1);
    const [editFieldValue, setEditFieldValue] = React.useState("");

    const editButtonHandler = React.useCallback(
        (index, value) => {
            setEditField(index)
            setEditFieldValue(value)
        }, [])

    const deleteButtonHandler = React.useCallback(
        (index) => {

        }, [])

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
                                <Grid>
                                    {mediaObjects.filter(dir => (dir.objectType === IMediaObjectType.DIRECTORY || dir.objectType === IMediaObjectType.FILE) && dir.parentId === selectedMediaObjectId).map((object: any, index: any) => (
                                        <Grid.Column className="parent" style={{ minWidth: "200px" }}>
                                            <Grid centered>
                                                <Grid.Row>
                                                    {editField === index ?
                                                        <Input style={{border:0,padding:0}} value={editFieldValue} onChange={(e) => { setEditFieldValue(e.target.value) }} /> : object.name}
                                                </Grid.Row>
                                                <Grid.Row container className="child" justify="center" style={{ width: "100%" }}>
                                                    <Icon name='edit' style={{ cursor: "pointer", fontSize: "inherit" }} onClick={() => editButtonHandler(index, object.name)} />
                                                    <Icon name='delete' style={{ fontSize: "inherit", margin: 0 }} />
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    ))}
                                </Grid>
                            )
                        }
                    </AppContent>
                </Sidebar.Pusher>
            </Sidebar.Pushable></>
    )
}

export default MediaObjectList;