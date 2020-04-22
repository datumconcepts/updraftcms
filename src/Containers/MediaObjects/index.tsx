// tslint:disable:jsx-no-lambda
import * as React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { AppActionsCreators } from 'Store/ActionCreators';
import { IAppState } from 'Store/State';

import MediaObjectList from 'Presentation/MediaObjects/MediaObjectList';
import { IMediaObjectState } from 'Store/State/IMediaObject';



type IMediaObjectContainerProps = IMediaObjectState & typeof AppActionsCreators.MediaObject

class MediaObjectContainer extends React.Component<IMediaObjectContainerProps, {}> {

  public render() {
    const { mediaObjects, selectedMediaObjectId, setSelectedMediaObject } = this.props;
    return (
      <React.Fragment>
        <Route
          path="/media-library"
          exact={true}
          render={renderProps => {
            return <MediaObjectList mediaObjects={[...mediaObjects.values()]} selectedMediaObjectId={selectedMediaObjectId} setSelectedMediaObject={setSelectedMediaObject} />
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
