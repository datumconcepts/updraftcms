import React from 'react';
import Layout from 'Presentation/_Layout';
import MediaObjectList from 'Presentation/MediaObjects/MediaObjectList';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'store-data/State';
import { SELECT_MEDIA_OBJECT } from 'store-data/actions/MediaObject';

const MediaObjectsPage: React.FC = () => {
    const { mediaObjects, selectedMediaObjectId } = useSelector((appState: IAppState) => appState.mediaObject);

    const dispatch = useDispatch();

    const selectMediaObject = React.useCallback((mediaObjectId: string) => dispatch({ type: SELECT_MEDIA_OBJECT, selectedMediaObjectId: mediaObjectId }), [dispatch]);

    return (<Layout>
        <MediaObjectList mediaObjects={[...mediaObjects.values()]} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={selectMediaObject} />
    </Layout>)
}

export default MediaObjectsPage;