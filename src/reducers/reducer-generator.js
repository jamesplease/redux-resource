import updateMetaHelper from '../utils/update-meta-helper';

export default function(crudAction, requestStatus) {
  return function(state, action) {
    return updateMetaHelper({
      resources: action.resources,
      label: action.label,
      mergeMeta: action.mergeMeta,
      requestStatus,
      crudAction,
      state
    });
  };
}
