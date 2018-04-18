import { actionTypes } from 'redux-resource';
import createActionCreators from '../../src';

describe('Redux Resource Action Creators', function() {
  beforeEach(() => {
    this.consoleError = stub(console, 'error');
  });

  it('should export a function', () => {
    expect(createActionCreators).to.be.a('function');
  });

  describe('Creating Action Creators', () => {
    it('should not console.error when a valid resourceType & crudType are provided', () => {
      createActionCreators('create', { resourceType: 'sandwiches' });
      expect(this.consoleError.callCount).to.equal(0);
    });

    it('should console.error when no actionDefaults are passed', () => {
      createActionCreators('create');
      expect(this.consoleError.callCount).to.equal(1);
    });

    it('should console.error when a valid crudType is not provided', () => {
      createActionCreators({ resourceType: 'sandwiches' });
      // Two warnings: one for no `crudType`, and one for no `resourceType`
      expect(this.consoleError.callCount).to.equal(2);
    });

    it('should return an object with the expected action actionCreators methods', () => {
      const actionCreators = createActionCreators('delete', {
        resourceType: 'sandwiches',
      });
      expect(this.consoleError.callCount).to.equal(0);

      expect(actionCreators.idle).to.be.a('function');
      expect(actionCreators.pending).to.be.a('function');
      expect(actionCreators.succeeded).to.be.a('function');
      expect(actionCreators.failed).to.be.a('function');
    });
  });

  describe('pending()', () => {
    it('should create an action with the expected action properties', () => {
      this.actionCreators = createActionCreators('read', {
        resourceType: 'sandwiches',
      });

      const action = this.actionCreators.pending({ customProp: 'customValue' });

      expect(action).to.deep.equal({
        resourceType: 'sandwiches',
        type: actionTypes.READ_RESOURCES_PENDING,
        customProp: 'customValue',
      });

      expect(this.consoleError.callCount).to.equal(0);
    });

    it('should warn if type is provided, but ignore it', () => {
      this.actionCreators = createActionCreators('read', {
        resourceType: 'sandwiches',
        type: 'oops',
      });

      const action = this.actionCreators.pending({ customProp: 'customValue' });

      expect(action).to.deep.equal({
        resourceType: 'sandwiches',
        type: actionTypes.READ_RESOURCES_PENDING,
        customProp: 'customValue',
      });

      expect(this.consoleError.callCount).to.equal(1);
    });
  });

  describe('idle()', () => {
    it('should create an action with the expected action properties', () => {
      const actionCreators = createActionCreators('update', {
        resourceType: 'sandwiches',
      });

      const action = actionCreators.idle({ customProp: 'customValue' });

      expect(action).to.deep.equal({
        resourceType: 'sandwiches',
        type: actionTypes.UPDATE_RESOURCES_IDLE,
        customProp: 'customValue',
      });

      expect(this.consoleError.callCount).to.equal(0);
    });
  });

  describe('succeeded()', () => {
    it('should create an action with the expected action properties', () => {
      const actionCreators = createActionCreators('create', {
        resourceType: 'sandwiches',
      });

      const action = actionCreators.succeeded({
        customProp: 'customValue',
        resources: [{ id: 1, type: 'pb&j' }, { id: 2, type: 'cuban' }],
      });

      expect(action).to.deep.equal({
        resourceType: 'sandwiches',
        type: actionTypes.CREATE_RESOURCES_SUCCEEDED,
        customProp: 'customValue',
        resources: [{ id: 1, type: 'pb&j' }, { id: 2, type: 'cuban' }],
      });

      expect(this.consoleError.callCount).to.equal(0);
    });
  });

  describe('failed()', () => {
    it('should create an action with the expected action properties', () => {
      const actionCreators = createActionCreators('delete', {
        resourceType: 'sandwiches',
      });

      const action = actionCreators.failed({
        error: 'you should never delete sandwiches',
      });

      expect(action).to.deep.equal({
        resourceType: 'sandwiches',
        type: actionTypes.DELETE_RESOURCES_FAILED,
        error: 'you should never delete sandwiches',
      });

      expect(this.consoleError.callCount).to.equal(0);
    });
  });
});
