import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'Store/State';
import { REQUEST_CONTENT_DOCUMENTS } from 'Store/actions/ContentDocument';



const useContentDocuments = () => {

    const { contentDocuments } = useSelector((appState: IAppState) => appState.contentDocument);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: REQUEST_CONTENT_DOCUMENTS });
    }, [dispatch]);

    return contentDocuments;
}

export default useContentDocuments;