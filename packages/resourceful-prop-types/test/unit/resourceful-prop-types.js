import PropTypes from 'prop-types';
import * as types from '../../src';

describe('Resourceful Prop Types', function() {
  beforeEach(() => {
    stub(console, 'error');
  });

  it('should be an object', () => {
    expect(types).to.be.an('object');
  });

  it('should have the right keys', () => {
    expect(types).to.have.keys([
      'slicePropType',
      'resourceIdsPropType',
      'resourcesPropType',
      'statusPropType'
    ]);
  });

  describe('slicePropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        slice: {
          resources: {},
          meta: {},
          requests: {},
          lists: {}
        }
      };

      const propTypes = {
        slice: types.slicePropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        slice: {
          resources: true,
          meta: {},
          requests: {},
          lists: {}
        }
      };

      const propTypes = {
        slice: types.slicePropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('resourceIdsPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        ids: [
          'mmm',
          100
        ]
      };

      const propTypes = {
        ids: types.resourceIdsPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        ids: [{}, '24']
      };

      const propTypes = {
        ids: types.resourceIdsPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('resourcesPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        resources: [
          {id: 'mm'},
          {id: 100}
        ]
      };

      const propTypes = {
        resources: types.resourcesPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        resources: [{}, '24']
      };

      const propTypes = {
        resources: types.resourcesPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('statusPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        status: {
          null: true,
          pending: false,
          failed: false,
          succeeded: false
        }
      };

      const propTypes = {
        status: types.statusPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        status: {
          pending: false
        }
      };

      const propTypes = {
        status: types.statusPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });
});
