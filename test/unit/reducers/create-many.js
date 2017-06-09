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
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.PENDING,
        readXhrStatus: requestStatuses.NULL
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
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.FAILED,
        readXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_MANY_HELLOS_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS_ABORT'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        },
        12: {
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.SUCCEEDED,
        readXhrStatus: requestStatuses.NULL
      }
    });
  });
});
