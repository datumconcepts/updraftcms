export interface IPropertyMap {
  id: string;
  name: string;
  sortOrder: number;
  propertyType: string;
  defaultValue?: any;
}
export interface IObjectModel {
  id: string;
  name: string;
  description: string;
  htmlProperties: IPropertyMap[];
  metaProperties: IPropertyMap[];
}
export interface IDocumentProperty {
  propertyMapId: string;
  value: any;
}
export interface IContentDocument {
  id: string;
  name: string;
  objectModelId: string;
  htmlProperties: IDocumentProperty[];
  metaProperties: IDocumentProperty[];
}
