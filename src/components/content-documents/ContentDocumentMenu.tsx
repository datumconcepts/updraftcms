import * as React from "react";
import {  Menu } from 'semantic-ui-react';
import {  useHistory, useParams } from "react-router-dom";

import { IObjectModel } from 'models';


interface IRouteParams {
    objectModelId?: string;
}

interface IContentDocumentMenuProps {
    objectModels: IObjectModel[];
}

const ContentDocumentMenu: React.FC<IContentDocumentMenuProps> = ({ objectModels }) => {

    const { objectModelId } = useParams<IRouteParams>();
    const history = useHistory();

    const navigateToModel = React.useCallback(({ id }: IObjectModel) => {
        history.push(`/${id}/content`);
    }, [history])

    return <Menu attached={true} vertical={true} fluid={true}>
        {
            objectModels.map((objectModel, index) => (
                <Menu.Item key={objectModel.id} active={objectModel.id === objectModelId}
                    color={objectModel.id === objectModelId ? "blue" : "black"}
                    onClick={() => navigateToModel(objectModel)}>
                    {objectModel.name}
                </Menu.Item>
            ))
        }
    </Menu>
}

export default ContentDocumentMenu;