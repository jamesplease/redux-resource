import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: create', function() {
  it('should handle `CREATE_HELLO`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.PENDING,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_FAILURE`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_FAILURE'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.FAILED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_ABORTED`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_ABORTED'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.ABORTED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_RESET_RESOLUTION`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_RESET_RESOLUTION'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLO_SUCCESS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_SUCCESS',
      resource: {
        id: 10,
        hungry: true
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 10, hungry: true}
      ],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.SUCCEEDED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });
});
