import updateMetaHelper from '../../../src/utils/update-meta-helper';
import {requestStatuses} from '../../../src';

describe('updateMetaHelper:', function() {
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

    const result = updateMetaHelper({
      state,
      crudAction: 'pasta',
      requestStatus: requestStatuses.FAILED
    });

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

    const result = updateMetaHelper({
      state,
      resources: [{id: 1}, {id: 5}, 6],
      crudAction: 'pasta',
      requestStatus: requestStatuses.FAILED
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

    const result = updateMetaHelper({
      state,
      resources: [1, 5, 6],
      crudAction: 'pasta',
      requestStatus: requestStatuses.FAILED
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

    const result = updateMetaHelper({
      state,
      crudAction: 'pasta',
      requestLabel: 'italiano',
      requestStatus: requestStatuses.FAILED
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

    const result = updateMetaHelper({
      state,
      resources: [1, 5, 6],
      crudAction: 'pasta',
      requestLabel: 'italiano',
      requestStatus: requestStatuses.FAILED
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

    const result = updateMetaHelper({
      state,
      resources: [1, 5, 6],
      crudAction: 'pasta',
      requestLabel: 'italiano',
      mergeMeta: false,
      requestStatus: requestStatuses.FAILED
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
