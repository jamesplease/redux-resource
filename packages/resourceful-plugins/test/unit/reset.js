import {reset} from '../../src';

const {resetResource} = reset;

describe('reset', function() {
  beforeEach(() => {
    stub(console, 'error');
  });

  it('should not change the state when the resource name does not match', () => {
    const reducer = reset('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: {name: 'James'}
      },
      meta: {
        24: {oinky: true}
      },
      labels: {
        pasta: {
          ids: [24],
          status: 'PENDING'
        }
      }
    };

    const action = resetResource('pasta');

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should not change the state when the action type does not match', () => {
    const reducer = reset('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: {name: 'James'}
      },
      meta: {
        24: {oinky: true}
      },
      labels: {
        pasta: {
          ids: [24],
          status: 'PENDING'
        }
      }
    };

    const action = {
      type: 'OINK'
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should reset the slice when there is no label', () => {
    const reducer = reset('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: {name: 'James'}
      },
      meta: {
        24: {oinky: true}
      },
      labels: {
        pasta: {
          ids: [24],
          status: 'PENDING'
        }
      }
    };

    const action = resetResource('books');

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      resources: {},
      meta: {},
      labels: {}
    });
  });

  it('should reset the label when there is a label', () => {
    const reducer = reset('books');

    const state = {
      selectedIds: [24],
      resources: {
        24: {name: 'James'}
      },
      meta: {
        24: {oinky: true}
      },
      labels: {
        pasta: {
          ids: [24],
          status: 'PENDING'
        },
        spaghetti: {
          ids: [100, 20],
          status: 'SUCCEEDED'
        }
      }
    };

    const action = resetResource('books', 'spaghetti');

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      selectedIds: [24],
      resources: {
        24: {name: 'James'}
      },
      meta: {
        24: {oinky: true}
      },
      labels: {
        pasta: {
          ids: [24],
          status: 'PENDING'
        },
        spaghetti: {
          ids: [],
          status: 'NULL'
        }
      }
    });
  });
});
