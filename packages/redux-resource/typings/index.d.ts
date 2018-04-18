import { Reducer, Action } from 'redux';

type TypeStringMap<T extends string> = {
  [S in T]: S;
}

/**
 * ResourceActionType is a union of all action types.
 */
export type ResourceActionType =
  | 'UPDATE_RESOURCES'
  | 'DELETE_RESOURCES'
  | 'CREATE_RESOURCES_FAILED'
  | 'CREATE_RESOURCES_IDLE'
  | 'CREATE_RESOURCES_PENDING'
  | 'CREATE_RESOURCES_SUCCEEDED'
  | 'DELETE_RESOURCES_FAILED'
  | 'DELETE_RESOURCES_IDLE'
  | 'DELETE_RESOURCES_PENDING'
  | 'DELETE_RESOURCES_SUCCEEDED'
  | 'READ_RESOURCES_FAILED'
  | 'READ_RESOURCES_IDLE'
  | 'READ_RESOURCES_PENDING'
  | 'READ_RESOURCES_SUCCEEDED'
  | 'UPDATE_RESOURCES_FAILED'
  | 'UPDATE_RESOURCES_IDLE'
  | 'UPDATE_RESOURCES_PENDING'
  | 'UPDATE_RESOURCES_SUCCEEDED'
  | 'REQUEST_FAILED'
  | 'REQUEST_IDLE'
  | 'REQUEST_PENDING'
  | 'REQUEST_SUCCEEDED';

/**
 * RequestStatus is a union of all possible request statuses.
 */
export type RequestStatus =
  | 'IDLE'
  | 'PENDING'
  | 'SUCCEEDED'
  | 'FAILED';

/**
 * actionTypes is an object containing all of the action types.
 */
export const actionTypes: TypeStringMap<ResourceActionType>;
export const requestStatuses: TypeStringMap<RequestStatus>;

/**
 * IDMap maps a resource's ID to a resource or ResourceMeta.
 *
 * @interface IDMap
 */
interface IDMap<T> {
  [id: string]: T;
  [id: number]: T;
}

/**
 * The default ResourceMeta interface. This metadata represents whether or not
 * a particular resource is being created, read, updated, or deleted using a
 * network request.
 *
 * @interface ResourceMeta
 */
export interface ResourceMeta {
  createStatus: RequestStatus;
  readStatus: RequestStatus;
  updateStatus: RequestStatus;
  deleteStatus: RequestStatus;
}

/**
 * A request object represents an asynchronous operation. Typically, they are
 * used to represent HTTP requests, but they are designed to be generic enough
 * for any kind of networking technology.
 *
 * @interface RequestObject
 */
export interface RequestObject {
  /**
   * A string that serves as an identifier for the request.
   *
   * @type {string}
   */
  requestKey: string;

  /**
   * A human-readable name that can be useful for debugging.
   *
   * @type {string}
   */
  requestName?: string;

  /**
   * The type of resource that is primarily affected by this request. This is the
   * resource slice that the request will be stored in.
   *
   * @type {string}
   */
  resourceType: string;

  /**
   * The resource IDs that are affected by this request.
   *
   * @type {(Array<number|string>)}
   */
  ids: Array<number|string>;

  /**
   * The status of this request.
   *
   * @type {RequestStatus}
   */
  status: RequestStatus;
}

/**
 * A ResourceSlice is a subsection of a Redux store's state. It contains not just
 * the raw resource data, but also other information to help manage and organize
 * data on the client.
 *
 * @interface ResourceSlice
 * @template R The resource type stored in this slice
 * @template M The metadata type. Defaults to ResourceMeta.
 */
export interface ResourceSlice<R, M extends ResourceMeta = ResourceMeta> {
  /**
   * The type of resource stored in this slice.
   *
   * @type {string}
   */
  resourceType: string;

  /**
   * An object mapping resource IDs to the corresponding resource.
   *
   * @type {IDMap<R>}
   */
  resources: IDMap<R>;

  /**
   * An object mapping resource IDs to the corresponding resource's metadata.
   *
   * @type {IDMap<M>}
   */
  meta: IDMap<M>;

  /**
   * Lists are ordered groupings of resources stored as an array of resource IDs.
   *
   * @type {({ [listName: string]: Array<number|string> })}
   */
  lists: { [listName: string]: Array<number|string> };

  /**
   * Request objects relating to this resource.
   *
   * @type {{ [requestName: string]: RequestObject }}
   */
  requests: { [requestName: string]: RequestObject };
}

/**
 * A ResourceFilterFunc is a filter function passed to getResources. It should
 * return true to include a resource in the selection, or false to exclude it.
 *
 * @interface ResourceFilterFunc
 */
export interface ResourceFilterFunc<R, M extends ResourceMeta> {
  (resource: R, meta: M, resourceSlice: ResourceSlice<R, M>): boolean;
}

/**
 * Retrieve resources using a filter function.
 *
 * @param {ResourceSlice<R, M>} slice
 * @param {ResourceFilterFunc<R, M>} filter
 * @returns {R[]}
 */
export function getResources<R, M extends ResourceMeta>(slice: ResourceSlice<R, M>, filter: ResourceFilterFunc<R, M>): R[];

/**
 * Retrieves resources by list name.
 *
 * @param {ResourceSlice<R, M>} slice
 * @param {string} listName
 * @returns {R[]}
 */
export function getResources<R, M extends ResourceMeta>(slice: ResourceSlice<R, M>, listName: string): R[];

/**
 * Retrieve resources by an array of IDs.
 *
 * @param {ResourceSlice<R, M>} slice
 * @param {(Array<string|number>)} resourceIds
 * @returns {R[]}
 */
export function getResources<R, M extends ResourceMeta>(slice: ResourceSlice<R, M>, resourceIds: Array<string|number>): R[];

/**
 * Retrieve all resources in the slice.
 *
 * @param {ResourceSlice<R, M>} slice
 * @returns {R[]}
 */
export function getResources<R, M extends ResourceMeta>(slice: ResourceSlice<R, M>): R[];

/**
 * An object with boolean values represeting the request status of a particular
 * CRUD operation.
 *
 * @interface StatusObject
 */
export interface StatusObject {
  idle: boolean;
  pending: boolean;
  failed: boolean;
  succeeded: boolean;
}

/**
 * Returns an object with boolean values representing the request status of a
 * particular CRUD operation.
 *
 * @param {S} state The current state of the Redux store.
 * @param {string} statusLocation A single path that points to a request status within `state`.
 * @param {boolean} [treatIdleAsPending]
 * @returns {StatusObject}
 */
export function getStatus<S>(state: S, statusLocation: string, treatIdleAsPending?: boolean): StatusObject;

/**
 * Returns an object with boolean values representing the aggregated request status
 * of multiple CRUD operations. Statuses are aggregated as follows:
 *
 * - If all of the requests are idle, then the aggregate status is idle.
 * - If any of the requests are failed, then the aggregate status is failed.
 * - If no requests have failed, but some are pending, then the aggregate status is pending.
 * - If all requests have succeeded, then the aggregate status is succeeded.
 *
 * @param {S} state
 * @param {string[]} statusLocations
 * @param {boolean} [treatIdleAsPending]
 * @returns {StatusObject}
 */
export function getStatus<S>(state: S, statusLocations: string[], treatIdleAsPending?: boolean): StatusObject;

/**
 * Options that can be used to configure the reducer.
 *
 * @interface ReducerOptions
 */
export interface ReducerOptions<R, M extends ResourceMeta> {
  /**
   * Initial state to shallowly merge into the slice's default initial state.
   *
   * @type {Partial<ResourceSlice<R, M>>}
   */
  initialState?: Partial<ResourceSlice<R, M>>;

  /**
   * An array of reducer functions that will be called after the default reducer
   * function.
   *
   * @type {Plugin<R, M>[]}
   */
  plugins?: Plugin<R, M>[];

  /**
   * Additional metadata to include in any new resource's metadata after a read
   * or create operation.
   *
   * @type {Partial<M>}
   */
  initialResourceMeta?: Partial<M>;
}

/**
 * A plugin returns a reducer function that will be called after the default
 * reducer function. Use this to augment the behavior of the built-in reducer,
 * or to add support for custom action types for this store slice.
 *
 * @interface Plugin
 */
export interface Plugin<R, M extends ResourceMeta> {
  (resourceType: string, options: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;
}

/**
 * Creates a reducer that manages a resource slice.
 *
 * @param {string} resourceType
 * @param {ReducerOptions<R, M>} [options]
 * @returns {Reducer<ResourceSlice<R, M>>}
 */
export function resourceReducer<R, M extends ResourceMeta>(resourceType: string, options?: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;

/**
 * An object that defines how to update the metadata.
 *
 * @interface SetResourceMetaOptions
 */
interface SetResourceMetaOptions<R, M extends ResourceMeta> {
  /**
   * An array of resources, or resource IDs, to update with the new meta.
   *
   * @type {(IDMap<R>|Array<R|string|number>)}
   */
  resources: IDMap<R>|Array<R|string|number>;

  /**
   * The meta to set on each of the resources.
   *
   * @type {M}
   */
  newMeta: M;

  /**
   * The current resource meta object from this resource's store slice. Optional
   * when mergeMeta is false, required otherwise.
   *
   * @type {IDMap<M>}
   */
  meta?: IDMap<M>;

  /**
   * Additional metadata to add to any resource that previously did not have metadata.
   *
   * @type {M}
   */
  initialResourceMeta?: M;

  /**
   * Whether or not to merge a resource's current metadata with the new metadata.
   * Defaults to true.
   *
   * @type {boolean}
   */
  mergeMeta?: boolean;
}

/**
 * Update one or more resources with the same metadata.
 *
 * @param {SetResourceMetaOptions<R, M>} options
 * @returns {M} The new resource meta object.
 */
export function setResourceMeta<R, M extends ResourceMeta>(options: SetResourceMetaOptions<R, M>): M;

/**
 * Add new or update existing resources.
 *
 * @param {IDMap<R>} resources The current resources object from your state tree.
 * @param {(IDMap<R>|R[])} newResources The new resources to add or update.
 * @param {boolean} [mergeResources] Whether or not to merge existing resources. Defaults to true.
 * @returns {IDMap<R>} The updated resources object.
 */
export function upsertResources<R>(resources: IDMap<R>, newResources: IDMap<R>|R[], mergeResources?: boolean): IDMap<R>;

/**
 * A ResourceAction is an action that can be dispatched.
 *
 * @interface ResourceAction
 * @extends {Action}
 */
export interface ResourceAction<R> extends Action {
  type: ResourceActionType;
  resourceType: string;
  resources?: Array<string|number> | R[];
  requestKey?: string;
  list?: string;
  mergeResources?: boolean;
  mergeMeta?: boolean;
  mergeListIds?: boolean;

  [key: string]: any;
}
