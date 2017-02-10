import simpleResource from '../../../src';
const {xhrStatuses} = simpleResource;

describe('reducers: update', function() {
  it('should handle `UPDATE_HELLO`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          updatingStatus: xhrStatuses.PENDING
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_FAILURE`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_FAILURE',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          updatingStatus: xhrStatuses.FAILED
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_ABORTED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_ABORTED',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          updatingStatus: xhrStatuses.ABORTED
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_RESET_RESOLUTION`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_RESET_RESOLUTION',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          updatingStatus: xhrStatuses.NULL
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_HELLO_SUCCESS`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_HELLO_SUCCESS',
      id: 3,
      resource: {
        id: 3,
        name: 'please'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3, name: 'please'},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          updatingStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });
});
