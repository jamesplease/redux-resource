import {combineStatuses, requestStatuses} from '../../../src';

describe('combineStatuses', function() {
  beforeEach(() => {
    this.state = {
      books: {
        listMeta: {
          readStatus: requestStatuses.PENDING,
          createStatus: requestStatuses.NULL,
          createManyStatus: requestStatuses.NULL,
        },
        meta: {}
      },
      sandwiches: {
        listMeta: {
          readStatus: requestStatuses.FAILED,
          createStatus: requestStatuses.NULL,
          createManyStatus: requestStatuses.NULL,
        },
        meta: {
          100: {
            readStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.NULL,
          },
          102: {
            readStatus: requestStatuses.SUCCEEDED,
            deleteStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.FAILED,
          },
          103: {
            readStatus: requestStatuses.SUCCEEDED,
            deleteStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.FAILED,
          }
        },
      }
    };
  });

  describe('paths', () => {
    it('should return a single status', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'books'
        }
      ])).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should return combined list read statuses', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'books'
        },
        {
          action: 'read',
          resourceName: 'sandwiches'
        }
      ])).to.deep.equal({
        pending: false,
        failed: true,
        succeeded: false
      });
    });

    it('should return combined resource read statuses where nothing is true', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 100
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 102
        }
      ])).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: false
      });
    });

    it('should return combined resource read statuses with `isNullPending`', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 100
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 102
        }
      ], true)).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should return combined resource read statuses where everything has succeeded', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 102
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 103
        }
      ])).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: true
      });
    });

    it('should return combined statuses for lists and resources where they are pending', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'books',
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 100
        }
      ], true)).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should fail when one is failed', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'books',
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
        },
        {
          action: 'read',
          resourceName: 'sandwiches',
          id: 100
        }
      ], true)).to.deep.equal({
        pending: false,
        failed: true,
        succeeded: false
      });
    });

    it('should work across actions', () => {
      expect(combineStatuses(this.state, [
        {
          action: 'read',
          resourceName: 'books',
        },
        {
          action: 'delete',
          resourceName: 'sandwiches',
          id: 102
        }
      ])).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });
  });
});
