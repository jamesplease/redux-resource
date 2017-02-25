import {
  updateResourcesMeta, upsertResource, xhrStatuses
} from '../utils';

export function retrieveOne(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {retrievingStatus: xhrStatuses.PENDING},
    id: action[idAttr]
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneFail(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {retrievingStatus: xhrStatuses.FAILED},
    id: action[idAttr]
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneSucceed(idAttribute, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {retrievingStatus: xhrStatuses.SUCCEEDED},
    id: action[idAttribute]
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : true;
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action[idAttribute],
    idAttribute, replace
  });

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function retrieveOneAbort(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {retrievingStatus: xhrStatuses.ABORTED},
    id: action[idAttr]
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneReset(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {retrievingStatus: xhrStatuses.NULL},
    id: action[idAttr]
  });

  return {
    ...state,
    resourcesMeta,
  };
}
