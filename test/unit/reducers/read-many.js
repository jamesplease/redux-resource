import reduxInconsistentApi from '../../../src/redux-inconsistent-api';
const {resourceStatuses} = reduxInconsistentApi;

describe('reducers: readMany', function() {
  it('should handle `RETRIEVE_HELLOS`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        retrievingStatus: resourceStatuses.PENDING
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_FAILURE`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_FAILURE'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        retrievingStatus: resourceStatuses.FAILED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCESS`', () => {
    const result = reduxInconsistentApi('hello');
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
          updatingStatus: null,
          retrievingStatus: null,
          isDeleting: false,
        },
        100: {
          updatingStatus: null,
          retrievingStatus: null,
          isDeleting: false
        }
      },
      resourcesListMeta: {
        retrievingStatus: resourceStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_SUCCESS` with a custom idAttribute', () => {
    const result = reduxInconsistentApi('hello', {
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
          updatingStatus: null,
          retrievingStatus: null,
          isDeleting: false,
        },
        100: {
          updatingStatus: null,
          retrievingStatus: null,
          isDeleting: false
        }
      },
      resourcesListMeta: {
        retrievingStatus: resourceStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_ABORTED`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLOS_ABORTED'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {},
      resourcesListMeta: {
        retrievingStatus: resourceStatuses.ABORTED
      }
    });
  });

  it('should handle `RETRIEVE_HELLOS_RESET_RESOLUTION`', () => {
    const result = reduxInconsistentApi('hello');

    // We set some value on `retrievingStatus` to check that this nulls it
    const resourcesListMetaState = {
      resourcesListMeta: {
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
        retrievingStatus: null
      }
    });
  });
});
