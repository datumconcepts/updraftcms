import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'Store/State';
import { REQUEST_OBJECT_MODELS } from 'Store/actions/ObjectModel';



const useObjectModels = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: REQUEST_OBJECT_MODELS });
    }, [dispatch]);

    return objectModels;
}

export default useObjectModels;