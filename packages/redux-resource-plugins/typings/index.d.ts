import { Action, Reducer } from 'redux';
import { ResourceSlice, ResourceMeta } from 'redux-resource';

interface IncludedResourcesOptions<M extends Object = {}> {
  initialResourceMeta?: M;
}

export function includedResources<R, M=ResourceMeta>(resourceType: string, options?: IncludedResourcesOptions<M>): Reducer<ResourceSlice<R, M>>;

export namespace reset {
  export type ActionType = 'RESET_RESOURCE';

  export const actionTypes: {
    RESET_RESOURCE: 'RESET_RESOURCE';
  };

  export interface ResetResourceOptions {
    request?: string;
    list?: string;
  }

  export interface ResetResourceAction extends Action {
    type: ActionType;
    resourceType: string;
    requestKey?: string;
    list?: string;
  }

  export function resetResource(resourceType: string, options?: ResetResourceOptions): ResetResourceAction;
}

interface ResetOptions {
  initialState?: object;
}

export function reset(resourceType: string, options?: ResetOptions): Reducer<ResourceSlice<any, any>>;

export function httpStatusCodes(resourceType: string): Reducer<ResourceSlice<any, any>>;

export namespace selection {
  export type ActionType =
    | 'SELECT_RESOURCES'
    | 'DESELECT_RESOURCES'
    | 'CLEAR_SELECTED_RESOURCES';

  export const actionTypes: {
    SELECT_RESOURCES: 'SELECT_RESOURCES';
    DESELECT_RESOURCES: 'DESELECT_RESOURCES';
    CLEAR_SELECTED_RESOURCES: 'CLEAR_SELECTED_RESOURCES';
  }

  interface InitialState {
    selectedIds: Array<any>;
  }

  export const initialState: InitialState;

  export interface SelectionAction<R=any> {
    type: 'SELECT_RESOURCES' | 'DESELECT_RESOURCES';
    resourceType: string;
    resources: Array<R|string|number>;
  }

  export interface ClearSelectionAction {
    type: 'CLEAR_SELECTED_RESOURCES';
    resourceType: string;
  }

  export function selectResources<R>(resourceType: string, resources: Array<R|string|number>): SelectionAction<R>;
  export function deselectResources<R>(resourceType: string, resources: Array<R|string|number>): SelectionAction<R>;
  export function clearSelectedResources(resourceType: string): ClearSelectionAction;
}

export function selection(resourceType: string): Reducer<ResourceSlice<any, any>>;
