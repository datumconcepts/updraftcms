import * as React from 'react';
import { Segment, Sidebar, Grid, Icon, Input, Ref } from 'semantic-ui-react';

import { IMediaObject, IMediaObjectType } from 'models';

import MediaObjectToolbar from './media-objects-toolbar';

import "./Hover.css";

import MediaObjectMenu from './MediaObjectMenu';
import AppContent from 'components/high-order/AppContent';
import EmptyListDisplay from 'components/high-order/EmptyListDisplay';

import ConfirmDialog, { IConfirmDialogProps } from "components/high-order/confirm-dialog";

interface IMediaObjectListProps {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
    setSelectedMediaObject(id: string): void;
    editMediaObject(mediaObjects: Map<string, IMediaObject>): void
    deleteMediaObject(mediaObjects: Map<string, IMediaObject>): void;
}

const MediaObjectList: React.FC<IMediaObjectListProps> = ({ mediaObjects, selectedMediaObjectId, setSelectedMediaObject, editMediaObject, deleteMediaObject }) => {

    const [editField, setEditField] = React.useState(-1);
    const [editFieldValue, setEditFieldValue] = React.useState("");
    const [dialog, confirm] = React.useState<IConfirmDialogProps>();
    const [mediaObject, updateMediaObject] = React.useState<IMediaObject>();

    const selection = React.useRef<HTMLInputElement | null>(null);

    const handleRename = React.useCallback(
        (editField, editFieldValue) => {
            console.log("Renamed " + editFieldValue);
            setEditField(-1);
        }, []
    )

    const handleClick = React.useCallback((e: any) => {
        if (selection && selection.current) {
            if (selection.current.contains(e.target)) {
                return;
            }
        }
        if (!(editField === -1)) {
            handleRename(editField, editFieldValue);
        }
    }, [editField, editFieldValue, handleRename])

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick]);

    const editButtonHandler = React.useCallback(
        (index, value) => {
            setEditField(index)
            setEditFieldValue(value)
        }, [])

    const deleteButtonHandler = React.useCallback((index, object) => {
        confirm({
            message: "Are you sure you want to delete " + object.name + "?",
            confirmAction: () => {
                console.log("delete " + object.name);
                // deleteMediaObject(new Map([...mediaObjects]);
                confirm(undefined);
            },
            cancelAction: () => {
                confirm(undefined);
            },
        });
    }, []);

    return (
        <>
            {dialog && <ConfirmDialog {...dialog} />}
            <MediaObjectToolbar mediaObjects={mediaObjects} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={setSelectedMediaObject} />
            <Sidebar.Pushable as={Segment} className="workspace" attached={true}>
                <MediaObjectMenu mediaObjects={mediaObjects} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={setSelectedMediaObject} editMediaObject={editMediaObject} deleteMediaObject={deleteMediaObject} />
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
                                        <Grid.Column className="parent" style={{ width: "200px" }} >
                                            <Grid centered>
                                                <Grid.Row >
                                                    <Icon style={{ cursor: 'default' }} onDoubleClick={object.objectType === IMediaObjectType.DIRECTORY ? () => { setSelectedMediaObject(object.id) } : undefined} size='huge' color="blue" name={object.objectType === IMediaObjectType.DIRECTORY ? 'folder outline' : 'file outline'} />
                                                </Grid.Row>
                                                <Grid.Row >
                                                    {editField === index ?
                                                        <Ref innerRef={selection}>
                                                            <Input className="center" autoFocus transparent fluid value={editFieldValue}
                                                                onChange={(e) => { setEditFieldValue(e.target.value) }}
                                                                onKeyPress={(e: any) => { if (e.key === 'Enter') { handleRename(editField, editFieldValue); } }}
                                                            />
                                                        </Ref> : <div style={{ cursor: 'default' }} onDoubleClick={object.objectType === IMediaObjectType.DIRECTORY ? () => { setSelectedMediaObject(object.id) } : undefined}> {object.name}</div>}
                                                </Grid.Row>
                                                <Grid.Row container className="child" justify="center" style={{ width: "100%" }}>
                                                    {!(editField === index) ?
                                                        <>
                                                            <Icon name='edit' style={{ cursor: "pointer", fontSize: "inherit" }} onClick={() => { editButtonHandler(index, object.name) }} />
                                                            <Icon name='delete' style={{ cursor: "pointer", fontSize: "inherit", margin: 0 }} onClick={() => deleteButtonHandler(index, object)} />
                                                        </> : null}
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