import {findMeta, requestStatuses} from '../../../src';

describe('findMeta', function() {
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
      expect(findMeta(this.state, 'books')).to.deep.equal({
        readStatus: requestStatuses.PENDING,
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
      });
    });

    it('should return a meta that exists', () => {
      expect(findMeta(this.state, 'sandwiches.102')).to.deep.equal({
        readStatus: requestStatuses.SUCCEEDED,
        deleteStatus: requestStatuses.PENDING,
        updateStatus: requestStatuses.FAILED,
      });
    });

    it('should return a meta that does not exist', () => {
      expect(findMeta(this.state, 'books.40')).to.deep.equal({});
    });
  });

  describe('objects', () => {
    it('should return the listMeta', () => {
      expect(findMeta(this.state, {resourceName: 'books'})).to.deep.equal({
        readStatus: requestStatuses.PENDING,
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
      });
    });

    it('should return a meta that exists', () => {
      expect(findMeta(this.state, {resourceName: 'sandwiches', id: 102})).to.deep.equal({
        readStatus: requestStatuses.SUCCEEDED,
        deleteStatus: requestStatuses.PENDING,
        updateStatus: requestStatuses.FAILED,
      });
    });

    it('should return a meta that does not exist', () => {
      expect(findMeta(this.state, {resourceName: 'books', id: 40})).to.deep.equal({});
    });
  });
});
