import {getStatus, requestStatuses} from '../../../src';

describe('getStatus', function() {
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
          }
        },
      }
    };
  });

  describe('paths', () => {
    it('should return the listMeta', () => {
      expect(getStatus(this.state, 'read', 'books')).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that exists', () => {
      expect(getStatus(this.state, 'read', 'sandwiches.102')).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: true
      });
    });

    it('should return a meta that exists and is null', () => {
      expect(getStatus(this.state, 'update', 'sandwiches.100')).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that exists and is null with `isNullPending` set to true', () => {
      expect(getStatus(this.state, 'update', 'sandwiches.100', true)).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that does exist', () => {
      expect(getStatus(this.state, 'update', 'books.10')).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that does not exist with `isNullPending` set to true', () => {
      expect(getStatus(this.state, 'update', 'books.10', true)).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });
  });

  describe('objects', () => {
    it('should return the listMeta', () => {
      expect(getStatus(this.state, 'read', {resourceName: 'books'})).to.deep.equal({
        pending: true,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that exists', () => {
      expect(getStatus(this.state, 'read', {resourceName: 'sandwiches', id: 102})).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: true
      });
    });

    it('should return a meta that exists and is null', () => {
      expect(getStatus(this.state, 'update', {resourceName: 'sandwiches', id: 100})).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: false
      });
    });

    it('should return a meta that does exist', () => {
      expect(getStatus(this.state, 'update', {resourceName: 'books', id: 2})).to.deep.equal({
        pending: false,
        failed: false,
        succeeded: false
      });
    });
  });
});
