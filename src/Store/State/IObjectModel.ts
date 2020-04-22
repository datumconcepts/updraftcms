import { IObjectModel } from 'Types';

export interface IObjectModelState {
    isLoading: boolean;
    objectModels: Map<string, IObjectModel>;
    selectedObjectModelId?: string;
}


export const defaultObjectModel = { description: "",   htmlProperties: [],   id: "",  metaProperties: [],  name: ""  } as IObjectModel;

export const unloadedObjectModelState: IObjectModelState = { isLoading: false, objectModels: new Map<string, IObjectModel>(), };