import * as React from "react";
import { Tab } from "semantic-ui-react";

import { IObjectModel, FormErrors } from "models";
import GeneralSettingsTab from "./object-model-tabs/GeneralSettingsTab";
import HtmlSettingsTab from "./object-model-tabs/HtmlSettingsTab";
import MetaSettingsTab from "./object-model-tabs/MetaSettingsTab";

interface IObjectModelEditProps {
  onValueChange: (objectModel: IObjectModel) => void;
  objectModel: IObjectModel;
  errors: FormErrors;
}

export interface IGeneralSettingsTabState {
  objectModel: IObjectModel;
  errors: FormErrors;
  activeIndex: number;
}

const ObjectModelEdit: React.FC<IObjectModelEditProps> = ({
  objectModel,
  errors,
  onValueChange,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (errors.get("name")) {
      console.log("test");
      setActiveIndex(0);
    }
  }, [errors, onValueChange]);

  const handleTabChange = React.useCallback(
    (e: any, { activeIndex }) => {
      setActiveIndex(activeIndex);
    },
    [setActiveIndex]
  );

  return (

    <Tab
      className="tab-container"
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
      menu={{ color: "olive", inverted: true }}
      panes={[
        {
          menuItem: "General Settings",
          render: () => (
            <GeneralSettingsTab
              onPropertyUpdate={onValueChange}
              objectModel={objectModel}
              errors={errors}
            />
          ),
        },
        {
          menuItem: "Html Properties",
          render: () => (
            <HtmlSettingsTab
              onPropertyUpdate={onValueChange}
              objectModel={objectModel}
            />
          ),
        },
        {
          menuItem: "Meta Properties",
          render: () => (
            <MetaSettingsTab
              onPropertyUpdate={onValueChange}
              objectModel={objectModel}
            />
          ),
        },
      ]}
    />
  );
};
export default ObjectModelEdit;
