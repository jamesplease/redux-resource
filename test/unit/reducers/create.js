import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: create', function() {
  it('should handle `CREATE_RESOURCE`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCE',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.PENDING,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCE_FAIL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.FAILED,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCES_RESET`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCE_RESET',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCE_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      idAttribute: 'movieId'
    });
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      resource: {
        movieId: 10,
        hungry: true
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 10, hungry: true}
      ],
      meta: {
        10: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createStatus: requestStatuses.SUCCEEDED,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
