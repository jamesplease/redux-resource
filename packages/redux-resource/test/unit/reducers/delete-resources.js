import { resourceReducer, requestStatuses } from '../../../src';
import { resetCodeCache } from '../../../src/utils/warning';

describe('reducers: DELETE_RESOURCES', function() {
  beforeEach(() => {
    resetCodeCache();
  });

  describe('When nothing else is passed', () => {
    it('does not change the state', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: { id: 1 },
          3: { id: 3 },
          4: { id: 4 },
        },
        requests: {
          pasta: {
            hungry: true,
          },
        },
        lists: {
          bookmarks: [1, 2, 3],
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      };

      const reducer = resourceReducer('hellos', { initialState });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES',
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
      });
      expect(console.error.callCount).to.equal(1);
    });
  });

  it('logs a warning when a resource does not have an ID (obj form)', () => {
    stub(console, 'error');
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: {
          1: { id: 1 },
          3: { id: 3 },
          4: { id: 4 },
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      },
      initialResourceMeta: {
        selected: false,
      },
    });

    reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [3, { name: 'sandwiches' }],
      },
    });

    expect(console.error.callCount).to.equal(1);
  });

  it('logs a warning when a resource ID is a non-string or non-integer', () => {
    stub(console, 'error');
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: {
          1: { id: 1 },
          3: { id: 3 },
          4: { id: 4 },
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      },
      initialResourceMeta: {
        selected: false,
      },
    });

    reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [true, { id: 5, name: 'sandwiches' }],
      },
    });

    expect(console.error.callCount).to.equal(1);
  });

  it('accepts an array of objects; deletes resources and their meta', () => {
    stub(console, 'error');
    const initialState = {
      resources: {
        1: { id: 1, name: 'Test' },
        3: { id: 3 },
        4: { id: 4 },
      },
      requests: {
        pasta: {
          hungry: true,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          name: 'what',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
      },
    };

    const reducer = resourceReducer('hellos', { initialState });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [
          {
            id: 1,
            name: 'Test2',
          },
          {
            id: 13,
            name: 'Test3',
          },
        ],
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
      resources: {
        3: { id: 3 },
        4: { id: 4 },
      },
      lists: {
        bookmarks: [2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
        3: {
          deleteStatus: 'sandwiches',
        },
        13: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
      },
    });
    expect(console.error.callCount).to.equal(0);
  });

  it('accepts an array of objects; deletes resources and their meta, allowing you to add additional meta', () => {
    stub(console, 'error');
    const initialState = {
      resources: {
        1: { id: 1, name: 'Test' },
        3: { id: 3 },
        4: { id: 4 },
      },
      requests: {
        pasta: {
          hungry: true,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          name: 'what',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
      },
    };

    const reducer = resourceReducer('hellos', { initialState });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [
          {
            id: 1,
            name: 'Test2',
          },
          {
            id: 13,
            name: 'Test3',
          },
        ],
      },
      meta: {
        hellos: {
          1: {
            deletedBy: 'james please',
          },
        },
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
      resources: {
        3: { id: 3 },
        4: { id: 4 },
      },
      lists: {
        bookmarks: [2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
          deletedBy: 'james please',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
        13: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
      },
    });
    expect(console.error.callCount).to.equal(0);
  });

  it('accepts an array of IDs; deletes resources and their meta', () => {
    stub(console, 'error');
    const initialState = {
      resources: {
        1: { id: 1, name: 'Test' },
        3: { id: 3 },
        4: { id: 4 },
      },
      requests: {
        pasta: {
          hungry: true,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          name: 'what',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
      },
    };

    const reducer = resourceReducer('hellos', { initialState });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [
          1,
          {
            id: 13,
            name: 'Test3',
          },
        ],
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
      resources: {
        3: { id: 3 },
        4: { id: 4 },
      },
      lists: {
        bookmarks: [2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
        3: {
          deleteStatus: 'sandwiches',
        },
        13: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
      },
    });
    expect(console.error.callCount).to.equal(0);
  });

  it('accepts an array of IDs; leaves lists alone when there is nothing to change', () => {
    stub(console, 'error');
    const initialState = {
      resources: {
        1: { id: 1, name: 'Test' },
        3: { id: 3 },
        4: { id: 4 },
      },
      requests: {
        pasta: {
          hungry: true,
        },
      },
      lists: {
        bookmarks: [2, 3],
        new: [10, 100, 1000],
      },
      meta: {
        1: {
          name: 'what',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
      },
    };

    const reducer = resourceReducer('hellos', { initialState });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        hellos: [
          1,
          {
            id: 13,
            name: 'Test3',
          },
        ],
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
      resources: {
        3: { id: 3 },
        4: { id: 4 },
      },
      meta: {
        1: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
        3: {
          deleteStatus: 'sandwiches',
        },
        13: {
          createStatus: requestStatuses.IDLE,
          readStatus: requestStatuses.IDLE,
          updateStatus: requestStatuses.IDLE,
          deleteStatus: requestStatuses.SUCCEEDED,
        },
      },
    });
    expect(console.error.callCount).to.equal(0);
  });

  it('does not warn when another resource type is attempted to be deleted', () => {
    stub(console, 'error');
    const initialState = {
      resources: {
        1: { id: 1 },
        3: { id: 3 },
        4: { id: 4 },
      },
      requests: {
        pasta: {
          hungry: true,
        },
      },
      lists: {
        bookmarks: [1, 2, 3],
      },
      meta: {
        1: {
          name: 'what',
        },
        3: {
          deleteStatus: 'sandwiches',
        },
      },
    };

    const reducer = resourceReducer('hellos', { initialState });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resources: {
        sandwiches: [
          1,
          {
            id: 13,
            name: 'Test3',
          },
        ],
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
    });
    expect(console.error.callCount).to.equal(0);
  });
});
