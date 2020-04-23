import * as React from "react";

import { useParams, useHistory } from "react-router-dom";


import { IContentDocument, IObjectModel } from 'models';



import HtmlSettingsTab from './ContentDocumentTabs/HtmlSettingsTab';
import MetaSettingsTab from './ContentDocumentTabs/MetaSettingsTab';

import { Tab } from 'semantic-ui-react';



interface IRouteParams {
  id: string;
}

interface IContentDocumentEditProps {
  contentDocument: IContentDocument;
  objectModels: Map<string, IObjectModel>;
  onValueChange: (contentDocument: IContentDocument) => void;
}

const ContentDocumentEdit: React.FC<IContentDocumentEditProps> = ({ contentDocument, objectModels, onValueChange }) => {

  const { id } = useParams<IRouteParams>();
  const history = useHistory();

  return (<Tab className="tab-container" menu={{ color: 'olive', inverted: true }} panes={
    [
      {
        menuItem: 'Html Properties',
        render: () => <HtmlSettingsTab
          onPropertyUpdate={onValueChange}
          contentDocument={contentDocument}
          objectModels={[...objectModels.values()]}
          onObjectModelChange={objectModelId => {
            history.push(`/${objectModelId}/content/edit/${id}`)
          }}
        />
      },
      {
        menuItem: 'Meta Properties',
        render: () => <MetaSettingsTab onPropertyUpdate={onValueChange} objectModels={[...objectModels.values()]} contentDocument={contentDocument} />

      }
    ]
  } />);
}



export default ContentDocumentEdit;
