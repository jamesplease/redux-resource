import setResourceMeta from '../utils/set-resource-meta';

export default function(state, action, requestStatus, crudAction, setIds = true) {
  const statusAttribute = `${crudAction}Status`;
  const ids = action.ids || [];

  if (!setIds || !ids.length) {
    return {
      ...state,
      listMeta: {
        ...state.listMeta,
        [statusAttribute]: requestStatus
      }
    };
  }

  return {
    ...state,
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: {[statusAttribute]: requestStatus},
      replace: false,
      ids
    })
  };
}
