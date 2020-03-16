const actionTypes = {
  SELECT_RESOURCES: 'SELECT_RESOURCES',
  DESELECT_RESOURCES: 'DESELECT_RESOURCES',
  CLEAR_SELECTED_RESOURCES: 'CLEAR_SELECTED_RESOURCES',
};

const initialState = {
  selectedIds: [],
};

function selectResources(resourceType, resources) {
  return {
    type: actionTypes.SELECT_RESOURCES,
    resourceType,
    resources,
  };
}

function deselectResources(resourceType, resources) {
  return {
    type: actionTypes.DESELECT_RESOURCES,
    resourceType,
    resources,
  };
}

function clearSelectedResources(resourceType) {
  return {
    type: actionTypes.CLEAR_SELECTED_RESOURCES,
    resourceType,
  };
}

function selection(resourceType) {
  return function(state, action) {
    // Ignore actions that were dispatched for another resource type
    const typeToUse = action.resourceType || action.resourceName;
    if (typeToUse !== resourceType) {
      return state;
    }

    let selectedIds, resourceIds;
    const resources = action.resources || [];

    if (action.type === actionTypes.SELECT_RESOURCES) {
      selectedIds = [...state.selectedIds] || [];
      resourceIds = resources.map(r => (typeof r === 'object' ? r.id : r));

      const selectedIdsSet = new Set(selectedIds);

      resourceIds.forEach(id => {
        if (!selectedIdsSet.has(id)) {
          selectedIds.push(id);
        }
      });

      return {
        ...state,
        selectedIds,
      };
    } else if (action.type === actionTypes.DESELECT_RESOURCES) {
      selectedIds = [...state.selectedIds] || [];
      resourceIds = resources.map(r => (typeof r === 'object' ? r.id : r));
      const resourceIdsSet = new Set(resourceIds);

      return {
        ...state,
        selectedIds: selectedIds.filter(id => !resourceIdsSet.has(id)),
      };
    } else if (action.type === actionTypes.CLEAR_SELECTED_RESOURCES) {
      return {
        ...state,
        selectedIds: [],
      };
    }

    return state;
  };
}

selection.actionTypes = actionTypes;
selection.selectResources = selectResources;
selection.deselectResources = deselectResources;
selection.clearSelectedResources = clearSelectedResources;
selection.initialState = initialState;

export default selection;
