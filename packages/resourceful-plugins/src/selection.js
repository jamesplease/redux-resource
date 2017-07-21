const actionTypes = {
  SELECT_RESOURCES: 'SELECT_RESOURCES',
  DESELECT_RESOURCES: 'DESELECT_RESOURCES',
  CLEAR_SELECTED_RESOURCES: 'CLEAR_SELECTED_RESOURCES'
};

const initialState = {
  selectedIds: []
};

function selection(resourceName) {
  return function(state, action) {
    // Ignore actions that were dispatched for another resource type
    if (action.resourceName !== resourceName) {
      return state;
    }

    let selectedIds, resourceIds;
    const resources = action.resources || [];

    if (action.type === actionTypes.SELECT_RESOURCES) {
      selectedIds = [...state.selectedIds] || [];
      resourceIds = resources.map(r => (typeof r === 'object' ? r.id : r));

      resourceIds.forEach(id => {
        if (!selectedIds.includes(id)) {
          selectedIds.push(id);
        }
      });

      return {
        ...state,
        selectedIds
      };
    } else if (action.type === actionTypes.DESELECT_RESOURCES) {
      selectedIds = [...state.selectedIds] || [];
      resourceIds = resources.map(r => (typeof r === 'object' ? r.id : r));

      return {
        ...state,
        selectedIds: selectedIds.filter(id => !resourceIds.includes(id))
      };
    } else if (action.type === actionTypes.CLEAR_SELECTED_RESOURCES) {
      return {
        ...state,
        selectedIds: []
      };
    }

    return state;
  };
}

export {actionTypes, initialState, selection};
