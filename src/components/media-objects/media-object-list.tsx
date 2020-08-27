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
}

const MediaObjectList: React.FC<IMediaObjectListProps> = ({ mediaObjects, selectedMediaObjectId, setSelectedMediaObject }) => {

    const [editField, setEditField] = React.useState(-1);
    const [editFieldValue, setEditFieldValue] = React.useState("");
    const [dialog, confirm] = React.useState<IConfirmDialogProps>();

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const selection = React.useRef<HTMLInputElement | null>(null);

    const handleClick = (e: any) => {
        if (selection && selection.current) {
            if (selection.current.contains(e.target)) {
                return;
            }
        }
        setEditField(-1)
    };

    const editButtonHandler = React.useCallback(
        (index, value) => {
            setEditField(index)
            setEditFieldValue(value)
        }, [])

    const deleteButtonHandler = React.useCallback((index, object) => {
        console.log("delete");
        confirm({
            message: "Are you sure you want to delete " + object.name + "?",
            confirmAction: () => {
                setEditField(-1);
                confirm(undefined);
            },
            cancelAction: () => {
                setEditField(-1);
                confirm(undefined);
            },
        });
    }, []);

    return (
        <>
            {dialog && <ConfirmDialog {...dialog} />}
            <MediaObjectToolbar mediaObjects={mediaObjects} selectedMediaObjectId={selectedMediaObjectId} />
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
                                        <Grid.Column className="parent" style={{ width: "200px" }} >
                                            <Grid centered>
                                                <Grid.Row >
                                                    <Icon size='huge' name={object.objectType === IMediaObjectType.DIRECTORY ? 'folder': 'file'} />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    {editField === index ?
                                                        <Ref innerRef={selection}>
                                                            <Input autoFocus value={editFieldValue}
                                                                onChange={(e) => { setEditFieldValue(e.target.value) }}
                                                                onKeyPress={(e: any) => { if (e.key === 'Enter') { setEditField(-1); } }}
                                                            />
                                                        </Ref> : <>{object.objectType === IMediaObjectType.DIRECTORY ? <div onDoubleClick={() => setSelectedMediaObject(object.id)} >{object.name}</div> : object.name}</>}
                                                </Grid.Row>
                                                <Grid.Row container className="child" justify="center" style={{ width: "100%" }}>
                                                    {editField === index ? null
                                                        // <Icon name='checkmark' style={{ cursor: "pointer", fontSize: "inherit", margin: 0 }} onClick={confirmButtonHandler} />
                                                        :
                                                        <>
                                                            <Icon name='edit' style={{ cursor: "pointer", fontSize: "inherit" }} onClick={() => editButtonHandler(index, object.name)} />
                                                            <Icon name='delete' style={{ cursor: "pointer", fontSize: "inherit", margin: 0 }} onClick={() => deleteButtonHandler(index, object)} />
                                                        </>}
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