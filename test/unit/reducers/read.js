import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: readMany', function() {
  it('should handle `READ_RESOURCES`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.PENDING
      }
    });
  });

  it('should handle `READ_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_FAIL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.FAILED
      }
    });
  });

  it('should handle `READ_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        meta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEED',
      resourceName: 'hellos',
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
      meta: {
        2: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
        },
        100: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_RESOURCES_SUCCEED` with `replace: false`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        meta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      replace: false,
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 100, hungry: false, sandwiches: 'yummm'},
        {id: 23},
        {id: 55},
        {id: 2, hungry: true, pasta: 'yespls'},
      ],
      meta: {
        2: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
        },
        23: 'sandwiches',
        100: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_RESOURCES_RESET`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        listMeta: {
          createStatus: requestStatuses.NULL,
          createManyStatus: requestStatuses.NULL,
          readStatus: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_RESET',
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
});
