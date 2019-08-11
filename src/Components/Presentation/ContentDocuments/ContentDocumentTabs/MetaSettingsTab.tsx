import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";


import Grid from "@material-ui/core/Grid";


import AppContent from "src/Components/Presentation/HOC/AppContent";

import LongTextComponent from "../PropertyTypes/LongTextComponent";
import OptionSelectComponent from "../PropertyTypes/OptionSelectComponent";
import ShortTextComponent from "../PropertyTypes/ShortTextComponent";


import { IContentDocument, IDocumentProperty, IObjectModel, IPropertyMap, } from "src/Types";

import { defaultObjectModel } from 'src/Store/State/IObjectModel';

import styles from "../EditStyles";

const propertyTypes: any[] = [
    {
        name: "Short Text",
        propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: IPropertyMap, documentProperty: IDocumentProperty) => (
            <ShortTextComponent key={key}
                onPropertyUpdate={onPropertyUpdate}
                documentProperty={documentProperty}
                propertyMap={propertyMap}
            />
        ),
        propertyType: "textbox"
    },
    {
        name: "Long Text",
        propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: IPropertyMap, documentProperty: IDocumentProperty) => (
            <LongTextComponent key={key}
                onPropertyUpdate={onPropertyUpdate}
                propertyMap={propertyMap}
            />
        ),
        propertyType: "textarea"
    },
    {
        name: "Option Select",
        propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: IPropertyMap, documentProperty: IDocumentProperty) => (
            <OptionSelectComponent key={key}
                onPropertyUpdate={onPropertyUpdate}
                propertyMap={propertyMap}
            />
        ),
        propertyType: "select"
    }
];

interface IMetaSettingsTabProps extends WithStyles<typeof styles> {
    contentDocument: IContentDocument;
    objectModels: IObjectModel[];
    onPropertyUpdate: (contentDocument: IContentDocument) => void;
}

class MetaSettingsTab extends React.Component<IMetaSettingsTabProps> {

    public metaValueChangeHandler = (htmlPrperty: IDocumentProperty) => {
        const { contentDocument, objectModels } = this.props;
        const objectModel = objectModels.find(model => model.id === contentDocument.objectModelId);
        if (!objectModel) {
            return;
        }
        this.props.onPropertyUpdate({
            ...this.props.contentDocument, 'metaProperties': [
                ...contentDocument.metaProperties.filter(prop => prop.propertyMapId !== htmlPrperty.propertyMapId),
                htmlPrperty
            ].sort((a: IDocumentProperty, b: IDocumentProperty) => {
                const sortOrderA = (objectModel.metaProperties.find(prop => prop.id === a.propertyMapId) || { sortOrder: 0 }).sortOrder;
                const sortOrderB = (objectModel.metaProperties.find(prop => prop.id === b.propertyMapId) || { sortOrder: 0 }).sortOrder;
                return sortOrderA - sortOrderB
            })
        });
    }

    public render() {
        const { contentDocument, objectModels } = this.props;
        const objectModel = objectModels.find(model => model.id === contentDocument.objectModelId) || defaultObjectModel;
        return (
            <AppContent>
                <Grid direction="column" justify="flex-start" container={true} spacing={2}>
                   
                    {
                        contentDocument.metaProperties.map((docProp, docPropIndex) => {
                            const propItem = objectModel.metaProperties.find(prop => prop.id === docProp.propertyMapId);
                            if (propItem) {
                                return propertyTypes
                                    .find(x => x.propertyType === propItem.propertyType)
                                    .propertyComponent(`doc_prop_meta_${docPropIndex}`, this.metaValueChangeHandler, propItem, docProp)
                            }
                        })
                    }
                </Grid>
            </AppContent>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MetaSettingsTab);
