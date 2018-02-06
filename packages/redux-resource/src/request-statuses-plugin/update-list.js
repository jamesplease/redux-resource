import warning from '../utils/warning';

export default function(state, action) {
  if (process.env.NODE_ENV !== 'production') {
    if (!action.lists) {
      warning(
        `A 'lists' object was not included in a Redux Resource ` +
        `action with type "${action.type}. Without a 'lists' object, ` +
        `Redux Resource will not update any list. You should check ` +
        `your action creators to make sure that they always include` +
        `a 'lists' object.`
      );
    }
  }

  const lists = action.lists || {};

  return {
    ...state,
    lists: {
      ...state.lists,
      ...lists
    }
  };
}
