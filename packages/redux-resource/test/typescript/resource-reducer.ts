import { resourceReducer, ResourceSlice, ResourceAction, ReducerOptions, ResourceMeta } from 'redux-resource';

const reducer = resourceReducer('books');
reducer({
  resourceType: 'books',
  resources: {},
  meta: {},
  lists: {},
  requests: {},
}, {
  type: 'ACTION',
});

interface Book {
  title: string;
}

interface BookMeta extends ResourceMeta {
  time: Date;
}

resourceReducer<Book, BookMeta>('books', {
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
