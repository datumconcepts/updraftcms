// tslint:disable:jsx-no-lambda
import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { AppActionsCreators } from 'src/Store/ActionCreators';
import { IAppState, IMediaObjectState } from 'src/Store/State';

import MediaObjectList from 'src/Components/Presentation/MediaObjects/MediaObjectList';



type IMediaObjectContainerProps = IMediaObjectState & typeof AppActionsCreators.MediaObject

class MediaObjectContainer extends React.Component<IMediaObjectContainerProps, {}> {

  public render() {
    // const { mediaObjects } = this.props;
    return (
      <React.Fragment>
        <Route
          path="/media-library"
          exact={true}
          render={renderProps => {
            return <MediaObjectList/>
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect((state: IAppState) => {
  return { ...state.mediaObject }
}, {
    ...AppActionsCreators.MediaObject
  })(MediaObjectContainer);
