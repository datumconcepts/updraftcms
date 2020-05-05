export interface IPropertyMap {
  id: string;
  name: string;
  sortOrder: number;
  propertyType: string;
  defaultValue?: any;
  required: boolean;
  properties?: any;
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

export interface IMediaObject {
  id: string;
  objectType: IMediaObjectType;
  parentId?: string;
  name: string;
  path: string;
}
export enum IMediaObjectType {
  DIRECTORY = 'directory',
  FILE = 'file'
}
export type FormErrors = { [key: string]: string }