import PropTypes from 'prop-types';
import { requestStatuses } from 'redux-resource';
import * as types from '../../src';

describe('Redux Resource Prop Types', function() {
  beforeEach(() => {
    stub(console, 'error');
  });

  it('should be an object', () => {
    expect(types).to.be.an('object');
  });

  it('should have the right keys', () => {
    expect(types).to.have.keys([
      'idPropType',
      'requestStatusPropType',
      'resourcePropType',
      'requestPropType',
      'statusPropType'
    ]);
  });

  describe('idPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        idOne: 'beep',
        idTwo: 2
      };

      const propTypes = {
        idOne: types.idPropType,
        idTwo: types.idPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        id: {}
      };

      const propTypes = {
        id: types.idPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('requestStatusPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        requestOne: requestStatuses.NULL,
        requestTwo: requestStatuses.PENDING
      };

      const propTypes = {
        requestOne: types.requestStatusPropType,
        requestTwo: types.requestStatusPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        requestStatus: 'pizza'
      };

      const propTypes = {
        requestStatus: types.requestStatusPropType
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('resourcePropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        resource: {
          id: 'mm',
          name: 'sandwiches'
        }
      };

      const propTypes = {
        resource: types.resourcePropType({
          name: PropTypes.string.isRequired
        })
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        resource: {
          name: 'spaghetti'
        }
      };

      const propTypes = {
        resource: types.resourcePropType({
          name: PropTypes.string.isRequired
        })
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(1);
    });
  });

  describe('requestPropType', () => {
    it('should not console.error when a valid slice is passed', () => {
      const props = {
        resource: {
          ids: [1, 'ok'],
          status: requestStatuses.FAILED,
          blah: 'sandwiches'
        }
      };

      const propTypes = {
        resource: types.requestPropType({
          blah: PropTypes.string.isRequired
        })
      };

      PropTypes.checkPropTypes(propTypes, props, 'prop', 'MyComponent');
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when an invalid slice is passed', () => {
      const props = {
        resource: {
          ids: [{}],
          status: true,
          blah: 'spaghetti'
        }
      };

      const propTypes = {
        resource: types.requestPropType({
          blah: PropTypes.string.isRequired
        })
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
