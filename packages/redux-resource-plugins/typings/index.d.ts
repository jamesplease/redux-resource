import { Action, Reducer } from 'redux';
import { ResourceSlice, ResourceMeta, ReducerOptions } from 'redux-resource';

/**
 * A plugin that allows a single action to include multiple resource types.
 *
 * @param {string} resourceType
 * @param {ReducerOptions<M>} [options]
 * @returns {Reducer<ResourceSlice<R, M>>}
 */
export function includedResources<R, M extends ResourceMeta>(resourceType: string, options?: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;

export namespace reset {
  export type ActionType = 'RESET_RESOURCE';

  export const actionTypes: {
    RESET_RESOURCE: 'RESET_RESOURCE';
  };

  /**
   * Options to scope what is reset.
   *
   * @interface ResetResourceOptions
   */
  export interface ResetResourceOptions {
    /**
     * Reset the request with this name.
     *
     * @type {string}
     */
    request?: string;

    /**
     * Reset the list with this name.
     *
     * @type {string}
     */
    list?: string;
  }

  /**
   * A dispatchable action that will reset state.
   *
   * @interface ResetResourceAction
   * @extends {Action}
   */
  export interface ResetResourceAction extends Action {
    type: ActionType;
    resourceType: string;
    requestKey?: string;
    list?: string;
  }

  /**
   * Creates an action to reset part of the state.
   *
   * @param {string} resourceType The name of the resource slice to reset.
   * @param {ResetResourceOptions} [options] Options to scope what is reset.
   * @returns {ResetResourceAction}
   */
  export function resetResource(resourceType: string, options?: ResetResourceOptions): ResetResourceAction;
}

export function reset<R, M extends ResourceMeta>(resourceType: string, options?: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;

export function httpStatusCodes<R, M extends ResourceMeta>(resourceType: string): Reducer<ResourceSlice<R, M>>;

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

  export interface InitialState {
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

/**
 * @deprecated Use the built-in UPDATE_RESOURCES action type to modify lists directly.
 * @param {string} resourceType
 * @returns {Reducer<ResourceSlice<any, any>>}
 */
export function selection(resourceType: string): Reducer<ResourceSlice<any, any>>;
