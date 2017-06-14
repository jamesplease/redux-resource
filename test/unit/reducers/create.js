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
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.PENDING,
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
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.FAILED,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_RESOURCES_NULL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_NULL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL,
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
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.SUCCEEDED,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
