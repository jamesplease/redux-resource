import simpleResource, {xhrStatuses} from '../../src';

describe('simpleResource', function() {
  it('should be a function', () => {
    expect(simpleResource).to.be.a('function');
  });

  it('should return an object with the proper shape', () => {
    const result = simpleResource('hello');
    expect(result).to.be.an('object');
    expect(result).to.contain.all.keys('initialState', 'reducer',
    'actionTypes', 'pluralForm');
  });

  it('should have the correct initialState', () => {
    const result = simpleResource('hello');
    expect(result.initialState).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  describe('passing in initialState', () => {
    it('should set the correct initialState when the defaults are not replaced', () => {
      const result = simpleResource('hello', {
        initialState: {
          hello: 'oink',
          pizza: true
        }
      });

      expect(result.initialState).to.deep.equal({
        resources: [],
        resourceMeta: {},
        resourceListMeta: {
          readXhrStatus: xhrStatuses.NULL,
          createManyXhrStatus: xhrStatuses.NULL,
          createXhrStatus: xhrStatuses.NULL
        },
        hello: 'oink',
        pizza: true
      });
    });

    it('should set the correct initialState when the defaults are replaced', () => {
      const result = simpleResource('hello', {
        initialState: {
          resources: [{id: 1}],
          resourceMeta: {1: true},
          resourceListMeta: {hungry: 'always'},
          pizza: true
        }
      });

      expect(result.initialState).to.deep.equal({
        resources: [{id: 1}],
        resourceMeta: {1: true},
        resourceListMeta: {
          hungry: 'always',
          readXhrStatus: xhrStatuses.NULL,
          createManyXhrStatus: xhrStatuses.NULL,
          createXhrStatus: xhrStatuses.NULL
        },
        pizza: true
      });
    });
  });
});
