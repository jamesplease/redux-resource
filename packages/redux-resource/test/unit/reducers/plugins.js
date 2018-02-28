import { resourceReducer, actionTypes } from '../../../src';
import { resetCodeCache } from '../../../src/utils/warning';

describe('reducer', function() {
  beforeEach(() => {
    resetCodeCache();
  });

  it('should warn when a bad plugin is initialized', () => {
    stub(console, 'error');

    resourceReducer('hellos', {
      plugins: [
        () => {
          // Intentionally blank
        },
      ],
    });

    expect(console.error.callCount).to.equal(1);
  });

  it('should handle a plug-in on a built-in type', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        () => (state, action) => {
          if (action.type === actionTypes.READ_RESOURCES_SUCCEEDED) {
            return {
              ...state,
              pizza: 'yum',
            };
          }

          return state;
        },
      ],
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEEDED',
      resourceType: 'hellos',
      resources: [3],
    });

    expect(reduced).to.deep.equal({
      resourceType: 'hellos',
      resources: {
        3: { id: 3 },
      },
      meta: {
        3: {
          createStatus: 'IDLE',
          readStatus: 'SUCCEEDED',
          updateStatus: 'IDLE',
          deleteStatus: 'IDLE',
        },
      },
      lists: {},
      requests: {},
      pizza: 'yum',
    });
  });

  it('should handle a plug-in on a custom type', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        () => (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: action.tastiness,
            };
          }

          return state;
        },
      ],
    });

    const reduced = reducer(undefined, {
      type: 'SANDWICHES_ARE_GOOD',
      resourceType: 'hellos',
      tastiness: 'quite',
    });

    expect(reduced).to.deep.equal({
      resourceType: 'hellos',
      resources: {},
      meta: {},
      lists: {},
      requests: {},
      tastiness: 'quite',
    });
  });

  it('should handle multiple plug-ins on a custom type, from right to left', () => {
    const reducer = resourceReducer('hellos', {
      plugins: [
        () => (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: true,
            };
          }

          return state;
        },
        () => (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: false,
            };
          }

          return state;
        },
      ],
    });

    const reduced = reducer(undefined, {
      type: 'SANDWICHES_ARE_GOOD',
      resourceType: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resourceType: 'hellos',
      resources: {},
      meta: {},
      lists: {},
      requests: {},
      tastiness: true,
    });
  });
});
