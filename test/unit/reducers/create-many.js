import simpleResource, {requestStatuses} from '../../../src';

describe('reducers: createMany', function() {
  it('should handle `CREATE_MANY_HELLOS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS'
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

  it('should handle `CREATE_MANY_HELLOS_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS_FAIL'
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

  it('should handle `CREATE_MANY_HELLOS_RESET`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS_RESET'
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

  it('should handle `CREATE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS_SUCCEED',
      resources: [
        {
          movieId: 10,
          hungry: true
        },
        {
          movieId: 12,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 10, hungry: true},
        {movieId: 12, hungry: false},
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
