import { resourceReducer, requestStatuses } from '../../../src';
import { resetCodeCache } from '../../../src/utils/warning';

describe('reducers: delete', function() {
  beforeEach(() => {
    resetCodeCache();
  });

  describe('DELETE_RESOURCES_SUCCEEDED', () => {
    it('returns the right state without a request name, without IDs', () => {
      stub(console, 'error');
      const initialState = {
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
      };

      const reducer = resourceReducer('hellos', { initialState });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
      });

      expect(reduced).to.deep.equal({
        ...initialState,
        resourceType: 'hellos',
      });
      expect(console.error.callCount).to.equal(1);
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [3, { name: 'sandwiches' }],
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('logs a warning when a list is included in the action', () => {
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        list: 'stuff',
        resources: [3],
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('logs a warning when a resource does not have an ID (id shorthand)', () => {
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [true, { id: 3 }],
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('logs a warning when `resources` is not an array', () => {
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
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: { id: 4 },
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('returns the right state without a request name, with IDs', () => {
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

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {},
        meta: {
          1: {
            name: 'what',
          },
          3: {
            selected: false,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            selected: false,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state without a request name, with IDs, including an ID of the number 0 (gh-298)', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            0: { id: 0 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {},
          meta: {
            0: {
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

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [0, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          0: null,
          3: { id: 3 },
          4: null,
        },
        lists: {},
        requests: {},
        meta: {
          0: {
            selected: false,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          3: {
            deleteStatus: 'sandwiches',
          },
          4: {
            selected: false,
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('warns and ignores a poorly-formatted request name', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        request: {},
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          italiano: {
            status: requestStatuses.PENDING,
            ids: [1, 3, 4],
            hangry: false,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(1);
    });

    it('returns the right state with a request name, with IDs, and requestProperties', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        request: 'italiano',
        requestProperties: {
          statusCode: 404,
          hangry: true,
        },
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          italiano: {
            requestKey: 'italiano',
            requestName: 'italiano',
            resourceType: 'hellos',
            status: requestStatuses.SUCCEEDED,
            ids: [3, 4],
            statusCode: 404,
            hangry: true,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state with a request key and name, with IDs', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            abc12345: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        requestKey: 'abc12345',
        requestName: 'deleteStuff',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          abc12345: {
            requestKey: 'abc12345',
            requestName: 'deleteStuff',
            resourceType: 'hellos',
            status: requestStatuses.SUCCEEDED,
            ids: [3, 4],
            hangry: false,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state with a request key and request name, with IDs', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            abc12345: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        requestKey: 'abc12345',
        requestName: 'deleteStuff',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          abc12345: {
            requestKey: 'abc12345',
            requestName: 'deleteStuff',
            resourceType: 'hellos',
            status: requestStatuses.SUCCEEDED,
            ids: [3, 4],
            hangry: false,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state with a request key and no request name, with IDs', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            abc12345: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        requestKey: 'abc12345',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          abc12345: {
            requestKey: 'abc12345',
            status: requestStatuses.SUCCEEDED,
            resourceType: 'hellos',
            ids: [3, 4],
            hangry: false,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('does not remove ids from a request name when the request name is not included in the action', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {},
          requests: {
            oink: {
              hungry: true,
              ids: [10, 3],
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {},
        requests: {
          italiano: {
            status: requestStatuses.PENDING,
            ids: [1, 3, 4],
            hangry: false,
          },
          oink: {
            ids: [10, 3],
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state when there are lists, when IDs are passed', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {
            oink: [10, 3],
            italiano: [1, 3, 4],
          },
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
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        resources: [3, { id: 4 }],
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: null,
          4: null,
        },
        lists: {
          oink: [10],
          italiano: [1],
        },
        requests: {},
        meta: {
          1: {
            name: 'what',
          },
          3: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
          4: {
            createStatus: requestStatuses.IDLE,
            readStatus: requestStatuses.IDLE,
            updateStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.SUCCEEDED,
          },
        },
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('returns the right state with a request name, without IDs', () => {
      stub(console, 'error');
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: {
            1: { id: 1 },
            3: { id: 3 },
            4: { id: 4 },
          },
          lists: {
            stuff: [1, 10, 100],
            ok: [2, 50],
          },
          requests: {
            oink: {
              hungry: true,
            },
            italiano: {
              status: requestStatuses.PENDING,
              ids: [1, 3, 4],
              hangry: false,
            },
          },
          meta: {
            1: {
              name: 'what',
            },
            3: {
              deleteStatus: 'sandwiches',
            },
          },
        },
      });

      const reduced = reducer(undefined, {
        type: 'DELETE_RESOURCES_SUCCEEDED',
        resourceType: 'hellos',
        request: 'italiano',
      });

      expect(reduced).to.deep.equal({
        resourceType: 'hellos',
        resources: {
          1: { id: 1 },
          3: { id: 3 },
          4: { id: 4 },
        },
        lists: {
          stuff: [1, 10, 100],
          ok: [2, 50],
        },
        requests: {
          italiano: {
            requestKey: 'italiano',
            requestName: 'italiano',
            resourceType: 'hellos',
            status: requestStatuses.SUCCEEDED,
            ids: [],
            hangry: false,
          },
          oink: {
            hungry: true,
          },
        },
        meta: {
          1: {
            name: 'what',
          },
          3: {
            deleteStatus: 'sandwiches',
          },
        },
      });

      expect(console.error.callCount).to.equal(1);
    });
  });
});
