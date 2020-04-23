import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'store/State';
import { REQUEST_OBJECT_MODELS } from 'store/actions/ObjectModel';



const useObjectModels = () => {

    const { objectModels } = useSelector((appState: IAppState) => appState.objectModel);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: REQUEST_OBJECT_MODELS });
    }, [dispatch]);

    return objectModels;
}

export default useObjectModels;