import generateDefaultInitialState from './utils/generate-default-initial-state';
import generateReducer from './generate-reducer';

// Create a resource reducer.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `initialState`: additional initial state to include on this resource
export default function resourceReducer(resourceName, initialState = {}, options = {}) {
  const {plugins = []} = options;
  const defaultInitialState = generateDefaultInitialState();
  const initial = {
    ...defaultInitialState,
    ...initialState,
    listMeta: {
      ...defaultInitialState.listMeta,
      ...initialState.listMeta
    }
  };

  return generateReducer({
    initialState: initial,
    resourceName,
    plugins
  });
}
