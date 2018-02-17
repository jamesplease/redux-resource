import defaultRequestPlugin from './default-request-plugin';
import composeReducers from './utils/compose-reducers';
import warning from './utils/warning';

const defaultInitialState = {
  requests: {},
};

export default (options = {}) => {
  const { plugins = [], initialState = {} } = options;

  const initial = {
    ...defaultInitialState,
    ...initialState,
  };

  const allPlugins = plugins.concat(defaultRequestPlugin);

  const computedPlugins = allPlugins.map(plugin => {
    const result = plugin(options);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof result !== 'function') {
        warning(
          `A plugin was initialized that did not return a function. Plugins ` +
            `should return a function with the same signature as a reducer. ` +
            `For more, refer to the documentation on plugins: ` +
            `https://redux-resource.js.org/docs/guides/plugins.html`
        );
      }
    }
    return result;
  });

  return function reducer(state = initial, action) {
    return composeReducers(computedPlugins)(state, action);
  };
};
