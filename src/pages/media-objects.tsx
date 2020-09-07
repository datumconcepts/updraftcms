import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IMediaObject } from 'models';

import { IAppState } from 'store/State';
import { SELECT_MEDIA_OBJECT, EDIT_MEDIA_OBJECT, DELETE_MEDIA_OBJECT } from 'store/actions/MediaObject';

import Layout from 'components/layout';
import MediaObjectList from 'components/media-objects/media-object-list';

const MediaObjectsPage: React.FC = () => {

    const { mediaObjects, selectedMediaObjectId } = useSelector((appState: IAppState) => appState.mediaObject);

    const [mediaObject, updateMediaObject] = React.useState<IMediaObject>();

    const dispatch = useDispatch();

    const selectMediaObject = React.useCallback((mediaObjectId: string) => dispatch({ type: SELECT_MEDIA_OBJECT, selectedMediaObjectId: mediaObjectId }), [dispatch]);

    const editMediaObject = React.useCallback((mediaObjects: Map<string, IMediaObject>) => dispatch({ type: EDIT_MEDIA_OBJECT, mediaObjects: mediaObjects }), [dispatch]);

    const deleteMediaObject = React.useCallback((mediaObjects: Map<string, IMediaObject>) => {
        if (mediaObject) {
            mediaObjects.delete(mediaObject.id);
            dispatch({ type: DELETE_MEDIA_OBJECT, mediaObjects: mediaObjects });
        }
    }, [dispatch]);

    return (<Layout>
        <MediaObjectList mediaObjects={[...mediaObjects.values()]} selectedMediaObjectId={selectedMediaObjectId} editMediaObject={editMediaObject} deleteMediaObject={deleteMediaObject} setSelectedMediaObject={selectMediaObject} />
    </Layout>)
}

export default MediaObjectsPage;