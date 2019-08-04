import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';



import { IObjectModel } from 'src/Types';

import styles from './MenuStyles';

interface IRouteParams {
    objectModelId: string;
}

interface IContentDocumentMenu extends RouteComponentProps<IRouteParams>, WithStyles<typeof styles> {
    objectModels: IObjectModel[];
}

class ContentDocumentMenu extends React.Component<IContentDocumentMenu, {}>{
    public navigateToModel = (id: string) => {
        const { history } = this.props;
        history.push(`/${id}/content`);
    }
    public render() {
        const { classes, match: { params } } = this.props;
        return (<Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar variant="dense" />
            <List disablePadding={true}>
                {([] as IObjectModel[])
                    .concat(this.props.objectModels)
                    .map((objectModel, index) => (
                        <ListItem button={true} key={objectModel.id}
                            onClick={() => this.navigateToModel(objectModel.id)}
                            selected={params.objectModelId === objectModel.id}>
                            <ListItemText primary={objectModel.name} />
                        </ListItem>
                    ))}
            </List>
        </Drawer>);
    }
}

const routedContentDocumentMenu = withRouter(ContentDocumentMenu);
export default withStyles(styles, { withTheme: true })(routedContentDocumentMenu);