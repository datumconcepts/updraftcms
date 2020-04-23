import * as React from "react";


import AppContent from "Presentation/HOC/AppContent";

import LongTextComponent from "../PropertyTypes/LongTextComponent";
import OptionSelectComponent from "../PropertyTypes/OptionSelectComponent";
import RichTextComponent from "../PropertyTypes/RichTextComponent";
import ShortTextComponent from "../PropertyTypes/ShortTextComponent";
import SingleFileComponent from '../PropertyTypes/FileUploadComponent';


import { IContentDocument, IDocumentProperty, IObjectModel, IPropertyMap, } from "Types";

import { defaultObjectModel } from 'store/State/IObjectModel';

import { Grid, Form, Select, Segment } from 'semantic-ui-react';

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
                documentProperty={documentProperty}
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
                documentProperty={documentProperty}
                onPropertyUpdate={onPropertyUpdate}
                propertyMap={propertyMap}
            />
        ),
        propertyType: "select"
    },
    {
        name: "Rich Text",
        propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: IPropertyMap, documentProperty: IDocumentProperty) => (
            <RichTextComponent key={key}
                propertyMap={propertyMap}
                documentProperty={documentProperty}
                onPropertyUpdate={onPropertyUpdate}
            />
        ),
        propertyType: "draftjs"
    },
    {
        name: "Single File",
        propertyComponent: (key: string, onPropertyUpdate: any, propertyMap: IPropertyMap, documentProperty: IDocumentProperty) => (
            <SingleFileComponent key={key}
                onPropertyUpdate={onPropertyUpdate}
                documentProperty={documentProperty}
                propertyMap={propertyMap}
            />
        ),
        propertyType: "file"
    },
    {
        name: "Multiple Files",
        propertyComponent: (key: string, props: any, propertyMap: any) => (
            <ShortTextComponent key={key} {...props} propertyMap={propertyMap} />
        ),
        propertyType: "multifile"
    }
];

interface IHtmlSettingsTabProps {
    contentDocument: IContentDocument;
    objectModels: IObjectModel[]
    onPropertyUpdate: (contentDocument: IContentDocument) => void;
    onObjectModelChange: (objectModelId: string) => void;
}

class HtmlSettingsTab extends React.Component<IHtmlSettingsTabProps> {

    public valueChangeHandler = (e: any) => {
        const { name, value } = e.target;
        this.props.onPropertyUpdate({ ...this.props.contentDocument, [name]: value });
    }

    public handleObjectModelChange = (value: any) => this.props.onObjectModelChange(value);

    public htmlValueChangeHandler = (htmlPrperty: IDocumentProperty) => {
        const { contentDocument, objectModels } = this.props;
        const objectModel = objectModels.find(model => model.id === contentDocument.objectModelId);
        if (!objectModel) {
            return;
        }
        this.props.onPropertyUpdate({
            ...this.props.contentDocument, 'htmlProperties': [
                ...contentDocument.htmlProperties.filter(prop => prop.propertyMapId !== htmlPrperty.propertyMapId),
                htmlPrperty
            ].sort((a: IDocumentProperty, b: IDocumentProperty) => {
                const sortOrderA = (objectModel.htmlProperties.find(prop => prop.id === a.propertyMapId) || { sortOrder: 0 }).sortOrder;
                const sortOrderB = (objectModel.htmlProperties.find(prop => prop.id === b.propertyMapId) || { sortOrder: 0 }).sortOrder;
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
                    <Form.Input
                        onChange={this.valueChangeHandler}
                        fluid={true}
                        name="name"
                        value={contentDocument.name}
                        label="Name"
                    />
                    <Select fluid={true} label="Object Model" value={objectModel.id}
                        options={[...objectModels.values()].map(objectModelOption => ({ value: objectModelOption.id, text: objectModelOption.name }))}
                        onChange={(e, { value }) => this.handleObjectModelChange(value)}
                    />
                    {
                        contentDocument.htmlProperties.map((docProp, docPropIndex) => {
                            const propItem = objectModel.htmlProperties.find(prop => prop.id === docProp.propertyMapId);
                            if (propItem) {
                                return propertyTypes
                                    .find(x => x.propertyType === propItem.propertyType)
                                    .propertyComponent(`doc_prop_html_${docPropIndex}`, this.htmlValueChangeHandler, propItem, docProp)
                            }
                        })
                    }
                </Segment>
            </AppContent>
        );
    }
}

export default HtmlSettingsTab;
