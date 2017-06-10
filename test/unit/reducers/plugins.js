import {resourceReducer, actionTypes, requestStatuses} from '../../../src';

describe('reducer', function() {
  it('should handle a plug-in on a built-in type', () => {
    const reducer = resourceReducer('hellos', {}, {
      plugins: [
        (state, action) => {
          if (action.type === actionTypes.READ_RESOURCE) {
            return {
              ...state,
              pizza: 'yum'
            };
          }

          return state;
        }
      ]
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        3: {
          readStatus: 'PENDING'
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      },
      pizza: 'yum'
    });
  });

  it('should handle a plug-in on a custom type', () => {
    const reducer = resourceReducer('hellos', {}, {
      plugins: [
        (state, action) => {
          if (action.type === 'SANDWICHES_ARE_GOOD') {
            return {
              ...state,
              tastiness: action.tastiness
            };
          }

          return state;
        }
      ]
    });

    const reduced = reducer(undefined, {
      type: 'SANDWICHES_ARE_GOOD',
      resourceName: 'hellos',
      tastiness: 'quite'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      },
      tastiness: 'quite'
    });
  });
});
