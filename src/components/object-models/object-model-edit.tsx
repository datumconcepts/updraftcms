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
  const [state, setState] = React.useState<IGeneralSettingsTabState>({
    objectModel,
    errors,
    activeIndex: 0,
  });
  React.useEffect(() => {
    if (errors.get("name")) {
      setState({ objectModel, errors, activeIndex: 0 });
    }
  }, [errors]);

  const handleTabChange = (e: any) => {
    const { activeIndex } = e.target;
    setState({ objectModel, errors, activeIndex });
  };

  return (
    // if errors.get('name') then activate general settings tab

    <Tab
      className="tab-container"
      activeIndex={state.activeIndex}
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
