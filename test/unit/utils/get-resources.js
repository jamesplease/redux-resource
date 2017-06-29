import {getResources, requestStatuses} from '../../../src/resourceful-redux';

describe('getStatus', function() {
  beforeEach(() => {
    this.state = {
      books: {
        resources: {
          1: {id: 1, name: 'sandwiches'},
          10: {id: 10, name: 'pizza'},
          102: {id: 102, name: 'fried'},
          116: {id: 116, name: 'pickles'},
        },
        meta: {},
        labels: {
          dashboardSearch: {
            ids: [10, 22, 102],
            status: requestStatuses.SUCCEEDED
          },
          detailsPage: {
            ids: [],
            status: requestStatuses.FAILED
          },
          malformedLabel: {}
        }
      },
      movies: {
        resources: {},
        meta: {},
        labels: {}
      }
    };
  });

  describe('when a nonexistent slice is passed', () => {
    it('should return an empty array', () => {
      expect(getResources(this.state, 'yum', [1])).to.deep.equal([]);
    });
  });

  describe('when the resources object is empty', () => {
    it('should return an empty array', () => {
      expect(getResources(this.state, 'movies', [1])).to.deep.equal([]);
    });
  });

  describe('labels', () => {
    it('should return an empty array when the label does not exist', () => {
      expect(getResources(this.state, 'books', 'sandwiches')).to.deep.equal([]);
    });

    it('should return an empty array when the label exists, and has no IDs', () => {
      expect(getResources(this.state, 'books', 'detailsPage')).to.deep.equal([]);
    });

    it('should return an empty array when the label exists, but does not have an IDs array (this should never happen!)', () => {
      expect(getResources(this.state, 'books', 'malformedLabel')).to.deep.equal([]);
    });

    it('should return the resources that exist when the label exists', () => {
      expect(getResources(this.state, 'books', 'dashboardSearch')).to.deep.equal([
        {id: 10, name: 'pizza'},
        {id: 102, name: 'fried'},
      ]);
    });
  });

  describe('ids', () => {
    it('should return an empty array when the IDs array is empty', () => {
      expect(getResources(this.state, 'books', [])).to.deep.equal([]);
    });

    it('should return the resources that when the IDs array is non-empty', () => {
      expect(getResources(this.state, 'books', [1, 116, 130])).to.deep.equal([
        {id: 1, name: 'sandwiches'},
        {id: 116, name: 'pickles'},
      ]);
    });
  });
});
