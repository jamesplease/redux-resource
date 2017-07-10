import reducerGenerator from '../../../src/utils/reducer-generator';
import {requestStatuses} from '../../../src';

describe('reducerGenerator:', function() {
  it('passing no IDs and no label', () => {
    stub(console, 'warn');

    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {});

    expect(result).to.equal(state);
    expect(console.warn.callCount).to.equal(1);
  });

  it('passing mixed resources array and no label', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [{id: 1}, {id: 5}, 6]
    }, {
      initialResourceMeta: {
        selected: false,
        readStatus: requestStatuses.PENDING
      }
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
          selected: false,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          selected: false,
          pastaStatus: requestStatuses.FAILED
        },
        6: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.PENDING,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          selected: false,
          pastaStatus: requestStatuses.FAILED
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    });
  });

  it('passing resources and no label', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6]
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED
        },
        6: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    });
  });

  it('passing no IDs, but passing a label', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      label: 'italiano'
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.FAILED
        },
        meep: {
          hungry: true
        }
      }
    });
  });

  it('passing IDs and passing a label', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      label: 'italiano'
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.FAILED
        },
        meep: {
          hungry: true
        }
      }
    });
  });

  it('passing IDs and passing a label with `mergeMeta: false`', () => {
    const state = {
      meta: {
        1: {
          pastaStatus: requestStatuses.PENDING,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.PENDING
        },
        meep: {
          hungry: true
        }
      }
    };

    const reducer = reducerGenerator('pasta', requestStatuses.FAILED);
    const result = reducer(state, {
      resources: [1, 5, 6],
      label: 'italiano',
      mergeMeta: false
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
          createStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          pastaStatus: requestStatuses.FAILED
        }
      },
      labels: {
        italiano: {
          sandwiches: true,
          status: requestStatuses.FAILED
        },
        meep: {
          hungry: true
        }
      }
    });
  });
});
