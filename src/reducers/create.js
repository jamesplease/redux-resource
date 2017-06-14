import updateMetaHelper from './update-meta-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

export function create(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createFail(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createNull(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.NULL,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createSucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const newResources = upsertResources({
    resources: state.resources,
    replace: false,
    newResources: resources,
  });

  return {
    ...state,
    resources: newResources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    meta: setResourceMeta({
      meta: state.meta,
      replace: false,
      newMeta: initialResourceMetaState,
      ids
    }),
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.SUCCEEDED
    }
  };
}
