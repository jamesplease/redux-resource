import {getStatus, requestStatuses} from '../../../src';

describe('getStatus', function() {
  beforeEach(() => {
    stub(console, 'error');

    this.state = {
      books: {
        meta: {},
        requests: {
          dashboardSearch: {
            ids: [10, 22],
            status: requestStatuses.SUCCEEDED
          }
        }
      },
      sandwiches: {
        meta: {
          100: {
            readStatus: requestStatuses.IDLE,
            deleteStatus: requestStatuses.PENDING,
            updateStatus: requestStatuses.IDLE,
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
      },
      things: {
        'pasta.is.tasty': {
          readStatus: requestStatuses.SUCCEEDED
        },
        24: {
          updateStatus: requestStatuses.FAILED
        },
        100: requestStatuses.PENDING,
        '\\\'': {
          deleteStatus: requestStatuses.PENDING
        },
        '[\'a\']': {
          '[\\"a\\"]': requestStatuses.FAILED
        }
      }
    };
  });

  describe('warnings', () => {
    it('should warn when a path does not resolve to a request status; resource', () => {
      const status = getStatus(this.state, 'sandwiches.meta.102');

      expect(status).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: false
      });

      expect(console.error.callCount).to.equal(1);
    });

    it('should warn when a path does not resolve to a request status; request name', () => {
      const status = getStatus(this.state, 'books.requests.dashboardSearch');

      expect(status).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: false
      });

      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('singular', () => {
    it('should return a request status that exists', () => {
      expect(getStatus(this.state, 'sandwiches.meta.102.readStatus')).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a request status that exists; bracket syntax', () => {
      expect(getStatus(this.state, 'sandwiches.meta[102].readStatus')).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a request status that exists', () => {
      expect(getStatus(this.state, 'books.requests.dashboardSearch.status')).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is null', () => {
      expect(getStatus(this.state, 'sandwiches.meta.100.readStatus')).to.deep.equal({
        null: true,
        pending: false,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is null; bracket syntax', () => {
      expect(getStatus(this.state, 'sandwiches.meta[100].readStatus')).to.deep.equal({
        null: true,
        pending: false,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is null with `treatIdleAsPending` set to true', () => {
      expect(getStatus(this.state, 'sandwiches.meta.100.readStatus', true)).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is null with `treatIdleAsPending` set to true; bracket syntax', () => {
      expect(getStatus(this.state, 'sandwiches.meta[100].readStatus', true)).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is succeeded with `treatIdleAsPending` set to true', () => {
      expect(getStatus(this.state, 'sandwiches.meta.102.readStatus', true)).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is succeeded with `treatIdleAsPending` set to true; bracket syntax', () => {
      expect(getStatus(this.state, 'sandwiches.meta[102].readStatus', true)).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that does not exist', () => {
      expect(getStatus(this.state, 'books.meta.10.updateStatus')).to.deep.equal({
        null: true,
        pending: false,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that does not exist with `treatIdleAsPending` set to true', () => {
      expect(getStatus(this.state, 'books.meta.10.updateStatus', true)).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax for keys with periods in them, double quotes', () => {
      expect(getStatus(this.state, 'things["pasta.is.tasty"].readStatus')).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax for keys with periods in them, single quotes', () => {
      expect(getStatus(this.state, "things['pasta.is.tasty'].readStatus")).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax for numbers', () => {
      expect(getStatus(this.state, 'things[24].updateStatus')).to.deep.equal({
        null: false,
        pending: false,
        failed: true,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax, ending on a bracket', () => {
      expect(getStatus(this.state, 'things[100]')).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax, ending on a bracket, but missing ending bracket', () => {
      expect(getStatus(this.state, 'things[100')).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support bracket syntax, ending on a bracket, but missing ending bracket with quotes', () => {
      expect(getStatus(this.state, 'things["100')).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support strings with escaped quotes', () => {
      // eslint-disable-next-line
      expect(getStatus(this.state, "things[\'\\\'\'].deleteStatus")).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should support strings with escaped quotes', () => {
      // eslint-disable-next-line
      expect(getStatus(this.state, 'things["[\'a\']"][\'[\\"a\\"]\']')).to.deep.equal({
        null: false,
        pending: false,
        failed: true,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });
  });

  describe('plural', () => {
    it('should return the combined status for two resources', () => {
      const result = getStatus(
        this.state,
        ['sandwiches.meta.100.readStatus', 'sandwiches.meta.102.updateStatus']
      );

      expect(result).to.deep.equal({
        null: false,
        pending: false,
        failed: true,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return combined resource statuses where everything is IDLE', () => {
      const result = getStatus(
        this.state,
        ['sandwiches.meta.100.readStatus', 'sandwiches.meta.102.readStatus']
      );

      expect(result).to.deep.equal({
        null: true,
        pending: false,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return combined resource read statuses with `treatIdleAsPending`', () => {
      const result = getStatus(
        this.state,
        ['sandwiches.meta.100.readStatus', 'sandwiches.meta.102.readStatus'],
        true
      );

      expect(result).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return combined statuses where everything has succeeded', () => {
      const result = getStatus(
        this.state,
        ['sandwiches.meta.102.readStatus', 'books.requests.dashboardSearch.status']
      );

      expect(result).to.deep.equal({
        null: false,
        pending: false,
        failed: false,
        succeeded: true
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should fail when one is failed', () => {
      const result = getStatus(
        this.state,
        [
          'sandwiches.meta.102.readStatus',
          'books.requests.dashboardSearch.status',
          'sandwiches.meta.102.updateStatus'
        ]
      );

      expect(result).to.deep.equal({
        null: false,
        pending: false,
        failed: true,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should fail when one is failed; bracket syntax', () => {
      const result = getStatus(
        this.state,
        [
          'sandwiches.meta[102].readStatus',
          'books.requests.dashboardSearch.status',
          'sandwiches.meta[102].updateStatus'
        ]
      );

      expect(result).to.deep.equal({
        null: false,
        pending: false,
        failed: true,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });
  });
});
