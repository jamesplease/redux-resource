import { getResources } from '../../../src';

describe('getResources', function() {
  beforeEach(() => {
    this.state = {
      books: {
        resources: {
          1: { id: 1, name: 'sandwiches' },
          10: { id: 10, name: 'pizza' },
          102: { id: 102, name: 'fried' },
          116: { id: 116, name: 'pickles' }
        },
        meta: {
          1: {},
          10: {
            selected: true
          },
          102: {
            selected: false
          },
          116: {
            selected: true
          }
        },
        lists: {
          dashboardSearch: [10, 22, 102],
          detailsPage: [],
          malformedList: {}
        }
      },
      movies: {
        resources: {},
        meta: {},
        requests: {}
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

  describe('lists', () => {
    it('should return an empty array when the list does not exist', () => {
      expect(getResources(this.state, 'books', 'sandwiches')).to.deep.equal([]);
    });

    it('should return an empty array when the list exists, and has no IDs', () => {
      expect(getResources(this.state, 'books', 'detailsPage')).to.deep.equal(
        []
      );
    });

    it('should return an empty array when the list exists, but does not have an IDs array (this should never happen!)', () => {
      expect(getResources(this.state, 'books', 'malformedList')).to.deep.equal(
        []
      );
    });

    it('should return the resources that exist when the list exists', () => {
      expect(
        getResources(this.state, 'books', 'dashboardSearch')
      ).to.deep.equal([{ id: 10, name: 'pizza' }, { id: 102, name: 'fried' }]);
    });
  });

  describe('ids', () => {
    it('should return an empty array when the IDs array is empty', () => {
      expect(getResources(this.state, 'books', [])).to.deep.equal([]);
    });

    it('should return the resources that when the IDs array is non-empty', () => {
      expect(getResources(this.state, 'books', [1, 116, 130])).to.deep.equal([
        { id: 1, name: 'sandwiches' },
        { id: 116, name: 'pickles' }
      ]);
    });
  });

  describe('filter function', () => {
    it('should return an empty array when nothing matches a filtering function', () => {
      const filter = (resource, meta, resourceSlice) => {
        const resourceId = resource.id;
        expect(resource).to.deep.equal(this.state.books.resources[resourceId]);
        expect(resourceSlice).to.deep.equal(this.state.books);
        expect(meta).to.deep.equal(this.state.books.meta[resourceId]);

        return false;
      };

      expect(getResources(this.state, 'books', filter)).to.deep.equal([]);
    });

    it('should return the resources that match a filtering function', () => {
      const filter = (resource, meta, resourceSlice) => {
        const resourceId = resource.id;
        expect(resource).to.deep.equal(this.state.books.resources[resourceId]);
        expect(resourceSlice).to.deep.equal(this.state.books);
        expect(meta).to.deep.equal(this.state.books.meta[resourceId]);

        return meta.selected;
      };

      expect(getResources(this.state, 'books', filter)).to.deep.equal([
        { id: 10, name: 'pizza' },
        { id: 116, name: 'pickles' }
      ]);
    });
  });
});
