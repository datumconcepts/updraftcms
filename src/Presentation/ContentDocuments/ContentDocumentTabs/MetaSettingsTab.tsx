import * as React from "react";


import AppContent from "Presentation/HOC/AppContent";

import LongTextComponent from "../PropertyTypes/LongTextComponent";
import OptionSelectComponent from "../PropertyTypes/OptionSelectComponent";
import ShortTextComponent from "../PropertyTypes/ShortTextComponent";


import { IContentDocument, IDocumentProperty, IObjectModel, IPropertyMap, } from "Types";

import { defaultObjectModel } from 'store-data/State/IObjectModel';
import { Segment, Form } from 'semantic-ui-react';


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
                documentProperty={documentProperty}
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
                documentProperty={documentProperty}
            />
        ),
        propertyType: "select"
    }
];

interface IMetaSettingsTabProps {
    contentDocument: IContentDocument;
    objectModels: IObjectModel[];
    onPropertyUpdate: (contentDocument: IContentDocument) => void;
}

class MetaSettingsTab extends React.Component<IMetaSettingsTabProps> {

    public metaValueChangeHandler = (metaProperty: IDocumentProperty) => {
        const { contentDocument, objectModels } = this.props;
        const objectModel = objectModels.find(model => model.id === contentDocument.objectModelId);
        if (!objectModel) {
            return;
        }
        this.props.onPropertyUpdate({
            ...this.props.contentDocument, 'metaProperties': [
                ...contentDocument.metaProperties.filter(prop => prop.propertyMapId !== metaProperty.propertyMapId),
                metaProperty
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
                 <Segment as={Form} attached={true}>
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
                </Segment>
            </AppContent>
        );
    }
}

export default MetaSettingsTab;
