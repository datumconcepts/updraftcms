import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";


import { IMediaObject } from 'src/Types';

import EmptyListDisplay from "../HOC/EmptyListDisplay";

import AppContent from "../HOC/AppContent";

import styles from "./ListStyles";
import MediaObjectMenu from './MediaObjectMenu';
import MediaObjectToolbar from './MediaObjectToolbar';

import { Grid } from '@material-ui/core';


interface IMediaObjectListProps extends RouteComponentProps, WithStyles<typeof styles> {
    mediaObjects: IMediaObject[];
    selectedMediaObjectId: string;
}

class MediaObjectList extends React.Component<IMediaObjectListProps> {

    public render() {
        const { mediaObjects, selectedMediaObjectId } = this.props;
        return (
            <Grid container={true} direction="row">
                <Grid item={true}>
                    <MediaObjectMenu mediaObjects={mediaObjects} selectedMediaObjectId={selectedMediaObjectId} /></Grid >
                <Grid item={true} xs={true}>
                    <Grid container={true} direction="column">
                        <MediaObjectToolbar />
                        <AppContent>
                            {mediaObjects.length === 0 ? (
                                <EmptyListDisplay
                                    clickHandler={() => false}
                                    title="It looks like you have no media objects yet. Click here to add a new one"
                                />
                            ) : (
                                    <div>Here is the content library</div>
                                )
                            }
                        </AppContent>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

const routedMediaObjectList = withRouter(MediaObjectList);
export default withStyles(styles, { withTheme: true })(routedMediaObjectList);