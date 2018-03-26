import { resourceReducer, ResourceSlice, ResourceAction, ReducerOptions } from 'redux-resource';

const reducer = resourceReducer('books');
reducer({
  resources: {},
  meta: {},
  lists: {},
  requests: {},
}, {
  type: 'ACTION',
});


resourceReducer('books', {
  initialState: {
    resources: {},
    meta: {},
    lists: {},
    requests: {},
  },
  plugins: [
    (resourceType, options) => (state, action) => {
      options.initialResourceMeta;
      options.initialState;
      options.plugins;
      return state;
    },
  ],
  initialResourceMeta: {
    time: new Date(),
  },
});
