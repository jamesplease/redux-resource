import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: custom', function() {
  it('should handle `CUSTOM_TYPE`', () => {
    const result = simpleResource('hello', {
      customHandlers: {
        CUSTOM_TYPE(state, action) {
          return {
            ...state,
            pizza: action.pizza
          };
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'CUSTOM_TYPE',
      pizza: 'delicious'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.NULL
      },
      pizza: 'delicious'
    });
  });
});
