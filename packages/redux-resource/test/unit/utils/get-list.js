import {getList} from '../../../src';

describe('getList', function() {
  beforeEach(() => {
    this.state = {
      books: {
        resources: {
          1: {id: 1, name: 'sandwiches'},
          10: {id: 10, name: 'pizza'},
          102: {id: 102, name: 'fried'},
          116: {id: 116, name: 'pickles'},
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
      expect(getList(this.state.yum, 'sandwich')).to.deep.equal([]);
    });
  });

  describe('when the slice exists, but the list does not', () => {
    it('should return an empty array', () => {
      expect(getList(this.state.books, 'beep')).to.deep.equal([]);
    });
  });

  describe('when the slice exists, but the list is not a valid input', () => {
    it('should return an empty array', () => {
      expect(getList(this.state.books, {})).to.deep.equal([]);
    });
  });

  describe('when the list is empty', () => {
    it('should return an empty array', () => {
      expect(getList(this.state.books, 'detailsPage')).to.deep.equal([]);
    });
  });

  describe('when the list is not empty', () => {
    it('should return the list', () => {
      expect(getList(this.state.books, 'dashboardSearch')).to.deep.equal([10, 22, 102]);
    });
  });

  describe('when an array of list names is passed in', () => {
    it('should return the lists as an object', () => {
      const lists = ['dashboardSearch', 'beep', 'detailsPage'];
      expect(getList(this.state.books, lists)).to.deep.equal({
        dashboardSearch: [10, 22, 102],
        beep: [],
        detailsPage: []
      });
    });
  });
});
