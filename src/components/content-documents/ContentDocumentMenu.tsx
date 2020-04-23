import * as React from "react";

import { RouteComponentProps, withRouter, useHistory, useParams } from "react-router-dom";

import { IObjectModel } from 'Types';
import { Sidebar, Menu } from 'semantic-ui-react';


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