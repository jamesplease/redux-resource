import simpleResource from '../../../src';
const {resourceStatuses} = simpleResource;

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
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.PENDING
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_FAILURE`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_FAILURE'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.FAILED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCESS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_SUCCESS',
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
          updatingStatus: resourceStatuses.NULL,
          retrievingStatus: resourceStatuses.NULL,
          deletingStatus: resourceStatuses.NULL,
        },
        100: {
          updatingStatus: resourceStatuses.NULL,
          retrievingStatus: resourceStatuses.NULL,
          deletingStatus: resourceStatuses.NULL
        }
      },
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCESS` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'namePls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_SUCCESS',
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
          updatingStatus: resourceStatuses.NULL,
          retrievingStatus: resourceStatuses.NULL,
          deletingStatus: resourceStatuses.NULL,
        },
        100: {
          updatingStatus: resourceStatuses.NULL,
          retrievingStatus: resourceStatuses.NULL,
          deletingStatus: resourceStatuses.NULL
        }
      },
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_ABORTED`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_ABORTED'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.ABORTED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_RESET_RESOLUTION`', () => {
    const result = simpleResource('hello');

    // We set some value on `retrievingStatus` to check that this nulls it
    const resourcesListMetaState = {
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: 'sandwiches'
      }
    };

    const reduced = result.reducer({
      ...result.initialState,
      ...resourcesListMetaState
    }, {
      type: 'RETRIEVE_HELLOS_RESET_RESOLUTION'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        creatingStatus: resourceStatuses.NULL,
        retrievingStatus: resourceStatuses.NULL
      }
    });
  });
});
