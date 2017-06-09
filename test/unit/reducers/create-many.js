import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: createMany', function() {
  it('should handle `CREATE_MANY_HELLOS`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_MANY_HELLOS'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.PENDING,
        readXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.FAILED,
        readXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.ABORTED,
        readXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {},
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        readXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {
        10: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL
        },
        12: {
          updateXhrStatus: xhrStatuses.NULL,
          readXhrStatus: xhrStatuses.NULL,
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        createXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.SUCCEEDED,
        readXhrStatus: xhrStatuses.NULL
      }
    });
  });
});
