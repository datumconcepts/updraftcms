import * as React from "react";
import { Tab } from 'semantic-ui-react';

import { IObjectModel } from "Types";

import GeneralSettingsTab from "./ObjectModelTabs/GeneralSettingsTab";
import HtmlSettingsTab from "./ObjectModelTabs/HtmlSettingsTab";
import MetaSettingsTab from "./ObjectModelTabs/MetaSettingsTab";

interface IObjectModelEditProps {
  onValueChange: (objectModel: IObjectModel) => void;
  objectModel: IObjectModel;
}

const ObjectModelEdit: React.FC<IObjectModelEditProps> = ({ objectModel, onValueChange }) => {
  return <Tab className="tab-container" menu={{ color: "olive", inverted: true }} panes={[
    {
      menuItem: 'General Settings',
      render: () => <GeneralSettingsTab
        onPropertyUpdate={onValueChange}
        objectModel={objectModel}
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
