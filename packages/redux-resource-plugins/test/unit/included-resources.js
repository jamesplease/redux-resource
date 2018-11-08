import { actionTypes } from 'redux-resource';
import { normalize, schema } from 'normalizr';
import { includedResources } from '../../src';

describe('includedResources', function() {
  it('does nothing for non-successful reads', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('does nothing when there is no `includedResources` attribute on the action', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('does nothing when there is no matching `includedResources`', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        sandwiches: [{ id: 2 }, { id: 4 }],
      },
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should add included resources when passed as an object with READ_RESOURCES_SUCCEEDED', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        23: { id: 23, color: 'blue' },
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
        23: { oinky: false },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23', color: 'blue' },
      },
      meta: {
        23: { readStatus: 'SUCCEEDED', oinky: false },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('should add included resources when passed as an object with CREATE_RESOURCES_SUCCEEDED', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        23: { id: 23, color: 'blue' },
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
        23: { oinky: false },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.CREATE_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23', color: 'blue' },
      },
      meta: {
        23: {
          readStatus: 'SUCCEEDED',
          createStatus: 'SUCCEEDED',
          oinky: false,
        },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('should add included resources when passed as an object with UPDATE_RESOURCES_SUCCEEDED', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        23: { id: 23, color: 'blue' },
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
        23: { oinky: false },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.UPDATE_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23', color: 'blue' },
      },
      meta: {
        23: {
          readStatus: 'SUCCEEDED',
          updateStatus: 'SUCCEEDED',
          oinky: false,
        },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('should not merge meta with mergeMeta: false', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
        23: { oinky: false },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      mergeMeta: false,
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23' },
      },
      meta: {
        23: { readStatus: 'SUCCEEDED' },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('should not merge resources with mergeResources: false', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        23: { id: 23, color: 'blue' },
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      mergeResources: false,
      includedResources: {
        books: {
          23: {
            id: 23,
            name: 'Book23',
          },
        },
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23' },
      },
      meta: {
        23: { readStatus: 'SUCCEEDED' },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('should add included resources when passed as an Array', () => {
    const reducer = includedResources('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: 'authors',
      resources: [10, 200],
      includedResources: {
        books: [
          {
            id: 23,
            name: 'Book23',
          },
        ],
      },
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'Book24' },
        23: { id: 23, name: 'Book23' },
      },
      meta: {
        23: { readStatus: 'SUCCEEDED' },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('integrates with normalizr; included resources', () => {
    const reducer = includedResources('comments');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'comment24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      commenter: user,
    });

    const article = new schema.Entity('articles', {
      author: user,
      comments: [comment],
    });

    const originalData = [
      {
        id: '123',
        author: {
          id: '1',
          name: 'Paul',
        },
        title: 'My awesome blog post',
        comments: [
          {
            id: '324',
            commenter: {
              id: '2',
              name: 'Nicole',
            },
          },
        ],
      },
    ];

    const normalizedData = normalize(originalData, [article]);

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: article.key,
      resources: normalizedData.result,
      includedResources: normalizedData.entities,
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'comment24' },
        324: { id: '324', commenter: '2' },
      },
      meta: {
        324: { readStatus: 'SUCCEEDED' },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });

  it('integrates with normalizr; primary resource', () => {
    const reducer = includedResources('articles');

    const state = {
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'comment24' },
      },
      meta: {
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    };

    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      commenter: user,
    });

    const article = new schema.Entity('articles', {
      author: user,
      comments: [comment],
    });

    const originalData = [
      {
        id: '123',
        author: {
          id: '1',
          name: 'Paul',
        },
        title: 'My awesome blog post',
        comments: [
          {
            id: '324',
            commenter: {
              id: '2',
              name: 'Nicole',
            },
          },
        ],
      },
    ];

    const normalizedData = normalize(originalData, [article]);

    const action = {
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceName: article.key,
      resources: normalizedData.result,
      includedResources: normalizedData.entities,
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: { id: 24, name: 'comment24' },
        123: {
          id: '123',
          author: '1',
          title: 'My awesome blog post',
          comments: ['324'],
        },
      },
      meta: {
        123: { readStatus: 'SUCCEEDED' },
        24: { oinky: true },
      },
      lists: {},
      requests: {},
    });
  });
});
