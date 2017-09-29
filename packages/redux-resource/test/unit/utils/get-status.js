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
    it('should return a meta that exists', () => {
      expect(getStatus(this.state, 'sandwiches.meta.102.readStatus')).to.deep.equal({
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

    it('should return a meta that exists and is null with `treatNullAsPending` set to true', () => {
      expect(getStatus(this.state, 'sandwiches.meta.100.readStatus', true)).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
        succeeded: false
      });
      expect(console.error.callCount).to.equal(0);
    });

    it('should return a meta that exists and is succeeded with `treatNullAsPending` set to true', () => {
      expect(getStatus(this.state, 'sandwiches.meta.102.readStatus', true)).to.deep.equal({
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

    it('should return a meta that does not exist with `treatNullAsPending` set to true', () => {
      expect(getStatus(this.state, 'books.meta.10.updateStatus', true)).to.deep.equal({
        null: false,
        pending: true,
        failed: false,
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

    it('should return combined resource statuses where everything is NULL', () => {
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

    it('should return combined resource read statuses with `treatNullAsPending`', () => {
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
  });
});
