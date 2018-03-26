import { Reducer, Action } from 'redux';

export type ResourceActionType =
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

export const actionTypes: {
  CREATE_RESOURCES_FAILED: 'CREATE_RESOURCES_FAILED';
  CREATE_RESOURCES_IDLE: 'CREATE_RESOURCES_IDLE';
  CREATE_RESOURCES_PENDING: 'CREATE_RESOURCES_PENDING';
  CREATE_RESOURCES_SUCCEEDED: 'CREATE_RESOURCES_SUCCEEDED';
  DELETE_RESOURCES_FAILED: 'DELETE_RESOURCES_FAILED';
  DELETE_RESOURCES_IDLE: 'DELETE_RESOURCES_IDLE';
  DELETE_RESOURCES_PENDING: 'DELETE_RESOURCES_PENDING';
  DELETE_RESOURCES_SUCCEEDED: 'DELETE_RESOURCES_SUCCEEDED';
  READ_RESOURCES_FAILED: 'READ_RESOURCES_FAILED';
  READ_RESOURCES_IDLE: 'READ_RESOURCES_IDLE';
  READ_RESOURCES_PENDING: 'READ_RESOURCES_PENDING';
  READ_RESOURCES_SUCCEEDED: 'READ_RESOURCES_SUCCEEDED';
  UPDATE_RESOURCES_FAILED: 'UPDATE_RESOURCES_FAILED';
  UPDATE_RESOURCES_IDLE: 'UPDATE_RESOURCES_IDLE';
  UPDATE_RESOURCES_PENDING: 'UPDATE_RESOURCES_PENDING';
  UPDATE_RESOURCES_SUCCEEDED: 'UPDATE_RESOURCES_SUCCEEDED';
  REQUEST_FAILED: 'REQUEST_FAILED';
  REQUEST_IDLE: 'REQUEST_IDLE';
  REQUEST_PENDING: 'REQUEST_PENDING';
  REQUEST_SUCCEEDED: 'REQUEST_SUCCEEDED';
};

export type RequestStatus = 'IDLE' | 'PENDING' | 'SUCCEEDED' | 'FAILED';

export const requestStatuses: {
  FAILED: 'FAILED',
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
};

interface ResourceMap<R> {
  [id: string]: R;
  [id: number]: R;
}

export interface ResourceMeta {
  createStatus: RequestStatus;
  readStatus: RequestStatus;
  updateStatus: RequestStatus;
  deleteStatus: RequestStatus;
}

interface ResourceMetaMap<M=ResourceMeta> {
  [id: string]: M;
  [id: number]: M;
}

interface ListMap {
  [name: string]: Array<number|string>;
}

interface RequestMap {
  [name: string]: {
    ids: Array<number|string>;
    status: RequestStatus;
  };
}

export interface ResourceSlice<R, M=ResourceMeta> {
  resources: ResourceMap<R>;
  meta: ResourceMetaMap<M>;
  lists: ListMap;
  requests: RequestMap;
}

export interface ResourceFilterFunc<R, M=ResourceMeta> {
  (resource: R, meta: M, resourceSlice: ResourceSlice<R, M>): boolean;
}

export function getResources<R, M=ResourceMeta>(state: ResourceSlice<R, M>, listName: string): R[];
export function getResources<R, M=ResourceMeta>(state: ResourceSlice<R, M>, resourceIds: Array<string|number>): R[];
export function getResources<R, M=ResourceMeta>(state: ResourceSlice<R, M>, filter: ResourceFilterFunc<R, M>): R[];
export function getResources<R, M=ResourceMeta>(state: ResourceSlice<R, M>): R[];

interface NamedRequestStatus {
  idle: boolean;
  pending: boolean;
  failed: boolean;
  succeeded: boolean;
}

export function getStatus<S>(state: S, statusLocations: string|string[], treatIdleAsPending?: boolean): NamedRequestStatus;

export interface Plugin<R, M=ResourceMeta> {
  (resourceType: string, options: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;
}

interface ReducerOptions<R, M=ResourceMeta> {
  initialState?: ResourceSlice<R, M>;
  plugins?: Plugin<R, ResourceSlice<R, M>>[];
  initialResourceMeta?: any;
}

export function resourceReducer<R, M=ResourceMeta>(resourceType: string, options?: ReducerOptions<R, M>): Reducer<ResourceSlice<R, M>>;

interface SetResourceMetaOptions<R, M=ResourceMeta> {
  resources: ResourceMap<R>|Array<R|string|number>;
  newMeta: M;
  meta?: ResourceMetaMap<M>;
  initialResourceMeta?: M;
  mergeMeta?: boolean;
}

export function setResourceMeta<R, M>(options: SetResourceMetaOptions<R, M>): M;

export function upsertResources<R>(resources: ResourceMap<R>, newResources: ResourceMap<R>|R[], mergeResources?: boolean): ResourceMap<R>;

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
