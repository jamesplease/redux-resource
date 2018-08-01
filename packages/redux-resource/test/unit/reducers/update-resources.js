import { resourceReducer } from '../../../src';
import { resetCodeCache } from '../../../src/utils/warning';

describe('reducers: UPDATE_RESOURCES', function() {
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
        type: 'UPDATE_RESOURCES',
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
      });
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('When `mergeListIds` is passed', () => {
    it('logs a warning to the console', () => {
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
        type: 'UPDATE_RESOURCES',
        resources: {
          // It is important that this is not "hellos". This verifies that the
          // reducer will only log when the resources object is entirely empty
          books: [1, 2, 3],
        },
        mergeListIds: false,
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
      });
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('lists', () => {
    it('empty list objects do not replace old lists', () => {
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
        type: 'UPDATE_RESOURCES',
        lists: {
          hellos: {},
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        lists: {
          bookmarks: [1, 2, 3],
          new: [10, 100, 1000],
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('replaces existing lists, adds new lists, leaves existing lists alone', () => {
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
        type: 'UPDATE_RESOURCES',
        lists: {
          hellos: {
            bookmarks: [2, 5, 6],
            sandwiches: [1, 2],
          },
          books: {
            pasta: [1, 10, 200],
          },
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        lists: {
          bookmarks: [2, 5, 6],
          new: [10, 100, 1000],
          sandwiches: [1, 2],
        },
      });
      expect(console.error.callCount).to.equal(0);
    });
  });

  describe('resources', () => {
    it('accepts an object; merges resources by default', () => {
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
        type: 'UPDATE_RESOURCES',
        resources: {
          hellos: {
            1: {
              id: 1,
              name: 'Test2',
            },
            13: {
              id: 13,
              name: 'Test3',
            },
          },
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        resources: {
          1: { id: 1, name: 'Test2' },
          3: { id: 3 },
          4: { id: 4 },
          13: {
            id: 13,
            name: 'Test3',
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('accepts an array; merges resources by default', () => {
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
        type: 'UPDATE_RESOURCES',
        resources: {
          hellos: [
            {
              id: 1,
              name: 'Test2',
            },
          ],
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        resources: {
          1: { id: 1, name: 'Test2' },
          3: { id: 3 },
          4: { id: 4 },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('respects mergeResources: false', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: { id: 1, name: 'Test', color: 'blue' },
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
        type: 'UPDATE_RESOURCES',
        resources: {
          hellos: [
            {
              id: 1,
              name: 'Test2',
            },
          ],
        },
        mergeResources: false,
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        resources: {
          1: { id: 1, name: 'Test2' },
          3: { id: 3 },
          4: { id: 4 },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('respects mergeResources: {hellos: false}', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: { id: 1, name: 'Test', color: 'blue' },
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
        type: 'UPDATE_RESOURCES',
        resources: {
          hellos: [
            {
              id: 1,
              name: 'Test2',
            },
          ],
        },
        mergeResources: {
          hellos: false,
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        resources: {
          1: { id: 1, name: 'Test2' },
          3: { id: 3 },
          4: { id: 4 },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });
  });

  describe('meta', () => {
    it('accepts an object; merges meta by default', () => {
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
        type: 'UPDATE_RESOURCES',
        meta: {
          hellos: {
            1: {
              selected: false,
            },
            13: {
              selected: true,
            },
          },
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        meta: {
          1: {
            name: 'what',
            selected: false,
          },
          3: {
            deleteStatus: 'sandwiches',
          },
          13: {
            selected: true,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('ignores an array', () => {
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
        type: 'UPDATE_RESOURCES',
        meta: {
          hellos: [
            {
              id: 1,
              name: 'Test2',
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

    it('respects mergeMeta: false', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: { id: 1, name: 'Test', color: 'blue' },
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
        type: 'UPDATE_RESOURCES',
        meta: {
          hellos: {
            1: {
              name: 'Test2',
            },
          },
        },
        mergeMeta: false,
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        meta: {
          1: {
            name: 'Test2',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('respects mergeMeta: {hellos: false}', () => {
      stub(console, 'error');
      const initialState = {
        resources: {
          1: { id: 1, name: 'Test', color: 'blue' },
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
        type: 'UPDATE_RESOURCES',
        meta: {
          hellos: {
            1: {
              name: 'Test2',
            },
          },
        },
        mergeMeta: {
          hellos: false,
        },
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
        meta: {
          1: {
            name: 'Test2',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });
  });

  it('does not warn when another resource type is attempted to be modified', () => {
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
      type: 'UPDATE_RESOURCES',
      meta: {
        sandwiches: {
          1: {
            name: 'Test2',
          },
        },
      },
    });

    expect(reduced).to.deep.equal({
      ...initialState,
      resourceType: 'hellos',
    });
    expect(console.error.callCount).to.equal(0);
  });
});
