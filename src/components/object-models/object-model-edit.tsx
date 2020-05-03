import * as React from "react";
import { Tab } from 'semantic-ui-react';

import { IObjectModel, FormErrors } from 'models';
import GeneralSettingsTab from "./object-model-tabs/GeneralSettingsTab";
import HtmlSettingsTab from "./object-model-tabs/HtmlSettingsTab";
import MetaSettingsTab from "./object-model-tabs/MetaSettingsTab";


interface IObjectModelEditProps {
  onValueChange: (objectModel: IObjectModel) => void;
  objectModel: IObjectModel;
  errors: FormErrors;
}

const ObjectModelEdit: React.FC<IObjectModelEditProps> = ({ objectModel, onValueChange }) => {


  return <Tab className="tab-container" menu={{ color: "olive", inverted: true }} panes={[
    {
      menuItem: 'General Settings',
      render: () => <GeneralSettingsTab
        onPropertyUpdate={onValueChange}
        objectModel={objectModel}
        errors={errors}
      />
    },
    {
      menuItem: 'Html Properties',
      render: () => <HtmlSettingsTab
        onPropertyUpdate={onValueChange}
        objectModel={objectModel}
      />
    },
    {
      menuItem: 'Meta Properties',
      render: () => <MetaSettingsTab
        onPropertyUpdate={onValueChange}
        objectModel={objectModel}
      />
    },

  ]} />
}
export default ObjectModelEdit;
