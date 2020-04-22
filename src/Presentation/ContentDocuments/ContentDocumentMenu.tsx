import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";




import { IObjectModel } from 'Types';
import { Sidebar, Menu } from 'semantic-ui-react';


interface IRouteParams {
    objectModelId: string;
}

interface IContentDocumentMenu extends RouteComponentProps<IRouteParams> {
    objectModels: IObjectModel[];
}

class ContentDocumentMenu extends React.Component<IContentDocumentMenu, {}>{
    public navigateToModel = (id: string) => {
        const { history } = this.props;
        history.push(`/${id}/content`);
    }
    public render() {
        const { match: { params } } = this.props;
        return (<Sidebar as={Menu} >
                {([] as IObjectModel[])
                    .concat(this.props.objectModels)
                    .map((objectModel, index) => (
                        <Menu.Item button={true} key={objectModel.id}
                            onClick={() => this.navigateToModel(objectModel.id)}
                            selected={params.objectModelId === objectModel.id}>
                            {objectModel.name}
                        </Menu.Item>
                    ))}
        </Sidebar>);
    }
}

export default withRouter(ContentDocumentMenu);