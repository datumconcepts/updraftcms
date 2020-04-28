import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IAppState } from 'store/State';
import { SELECT_MEDIA_OBJECT } from 'store/actions/MediaObject';

import Layout from 'components/layout';
import MediaObjectList from 'components/media-objects/media-object-list';



const MediaObjectsPage: React.FC = () => {
    const { mediaObjects, selectedMediaObjectId } = useSelector((appState: IAppState) => appState.mediaObject);

    const dispatch = useDispatch();

    const selectMediaObject = React.useCallback((mediaObjectId: string) => dispatch({ type: SELECT_MEDIA_OBJECT, selectedMediaObjectId: mediaObjectId }), [dispatch]);

    return (<Layout>
        <MediaObjectList mediaObjects={[...mediaObjects.values()]} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={selectMediaObject} />
    </Layout>)
}

export default MediaObjectsPage;