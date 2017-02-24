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

  it('should handle `CREATE_HELLOS_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_FAIL'
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

  it('should handle `CREATE_HELLOS_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_ABORT'
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

  it('should handle `CREATE_HELLOS_RESET`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_RESET'
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

  it('should handle `CREATE_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_SUCCEED',
      resource: {
        id: 10,
        hungry: true
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 10, hungry: true}
      ],
      resourcesMeta: {
        10: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL
        }
      },
      resourcesListMeta: {
        creatingStatus: xhrStatuses.SUCCEEDED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });
});
