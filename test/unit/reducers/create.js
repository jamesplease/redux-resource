import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: createMany', function() {
  it('should handle `CREATE_RESOURCES`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.PENDING,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_FAIL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.FAILED,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCES_RESET`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_RESET',
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

  it('should handle `CREATE_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      resources: [
        {
          id: 10,
          hungry: true
        },
        {
          id: 12,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 10, hungry: true},
        {id: 12, hungry: false},
      ],
      meta: {
        10: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        },
        12: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.SUCCEEDED,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
