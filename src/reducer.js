import actionTypes from './action-types';

export default function generateReducers(idType, initialState) {
  return function reducer(state = initialState, action) {
    const {id, type} = action;
    switch (type) {
      case actionTypes.SET_MOVIE_BOARD_RATINGS_DISPLAY: {
        const {active, boardName} = action;
        return {
          ...state,
          active,
          boardName,
          // unset the status so the UI doesn't keep showing the error message on every modal open
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: null}, id)
        };
      }

      case actionTypes.SET_DELETE_RATINGS_DISPLAY: {
        const {showDeleteConfirmation, deletedRatingId} = action;
        return {
          ...state,
          showDeleteConfirmation,
          deletedRatingId,
          // unset the status so the UI doesn't keep showing the error message on every modal open
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: null}, id)
        };
      }

      case actionTypes.PERSIST_MOVIE_BOARD_RATINGS: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_PENDING}, id)
        };
      }

      case actionTypes.PERSIST_MOVIE_BOARD_RATINGS_FAILURE: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_FAILURE}, id)
        };
      }

      case actionTypes.PERSIST_MOVIE_BOARD_RATINGS_SUCCESS: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_SUCCESS}, id),
          // TODO: add or update resource should probably be called here, unless we only need to indicate 200OK
          active: action.active
        };
      }

      case actionTypes.DELETE_MOVIE_BOARD_RATINGS: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_PENDING}, id)
        };
      }

      case actionTypes.DELETE_MOVIE_BOARD_RATINGS_FAILURE: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_FAILURE}, id)
        };
      }

      case actionTypes.DELETE_MOVIE_BOARD_RATINGS_SUCCESS: {
        return {
          ...state,
          resourcesMeta: updateResourcesMeta(state.resourcesMeta, {status: ResourceConstants.RETRIEVE_SUCCESS}, id),
          showDeleteConfirmation: action.showDeleteConfirmation
        };
      }

      default: {
        return state;
      }
    };
  }
}
