import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: readMany', function() {
  it('should handle `RETRIEVE_HELLOS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.PENDING
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_FAIL'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.FAILED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_SUCCEED',
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ],
      resourcesMeta: {
        2: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL,
        },
        100: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL
        }
      },
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'namePls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_SUCCEED',
      resources: [
        {namePls: 2, hungry: true, pasta: 'yespls'},
        {namePls: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {namePls: 2, hungry: true, pasta: 'yespls'},
        {namePls: 100, hungry: false},
      ],
      resourcesMeta: {
        2: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL,
        },
        100: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL
        }
      },
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_ABORT'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.ABORTED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_RESET`', () => {
    const result = simpleResource('hello');

    // We set some value on `retrievingStatus` to check that this nulls it
    const resourcesListMetaState = {
      resourcesListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: 'sandwiches'
      }
    };

    const reduced = result.reducer({
      ...result.initialState,
      ...resourcesListMetaState
    }, {
      type: 'RETRIEVE_HELLOS_RESET'
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
});
