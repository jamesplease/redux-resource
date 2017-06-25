import reducerGenerator from '../../../src/resourceful-redux/utils/reducer-generator';
import {requestStatuses} from '../../../src/resourceful-redux';

describe('reducerGenerator:', function() {
  it('passing no IDs and no label', () => {
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
    });

    expect(result).to.deep.equal({
      meta: {
        1: {
          pastaStatus: requestStatuses.FAILED,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          pastaStatus: requestStatuses.FAILED
        },
        6: {
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
          pastaStatus: requestStatuses.FAILED,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          pastaStatus: requestStatuses.FAILED
        },
        6: {
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
          pastaStatus: requestStatuses.FAILED,
          hangry: true
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
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
          pastaStatus: requestStatuses.FAILED,
        },
        2: {
          pastaStatus: requestStatuses.FAILED,
          sandwichStatus: requestStatuses.PENDING
        },
        5: {
          pastaStatus: requestStatuses.FAILED,
        },
        6: {
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
