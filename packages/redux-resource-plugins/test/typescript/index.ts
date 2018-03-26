import { resourceReducer } from 'redux-resource';
import {
  httpStatusCodes,
  includedResources,
  reset,
  selection,
} from 'redux-resource-plugins';

const reducer = resourceReducer('books', {
  plugins: [
    includedResources,
    httpStatusCodes,
    reset,
    selection,
  ],
});

const resetAction = reset.resetResource('books');
resetAction.type === reset.actionTypes.RESET_RESOURCE;
resetAction.resourceType === 'books';

const selectAction = selection.selectResources('books', [1, 2, 3]);
selectAction.type === selection.actionTypes.SELECT_RESOURCES;

const deselectAction = selection.deselectResources('books', [1, 2, 3]);
deselectAction.type === selection.actionTypes.DESELECT_RESOURCES;

const clearSelectionAction = selection.clearSelectedResources('books');
clearSelectionAction.type === selection.actionTypes.CLEAR_SELECTED_RESOURCES;
