import updateMetaHelper from './update-meta-helper';
// import successMetaHelper from './success-meta-helper';
import requestStatuses from '../utils/request-statuses';
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
  const mergeResources = action.mergeResources;
  // const ids = resources.map(r => r.id);

  const newResources = upsertResources(state.resources, resources, mergeResources);
  // const allMeta = successMetaHelper({
  //   requestLabel: action.requestLabel,
  //   crudAction: 'create',
  //   state,
  //   ids
  // });

  return {
    ...state,
    // ...allMeta,
    resources: newResources
  };
}
