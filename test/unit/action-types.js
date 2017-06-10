import {actionTypes} from '../../src';

describe('actionTypes', function() {
  it('should be an object', () => {
    expect(actionTypes).to.be.an('object');
  });

  describe('create', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.CREATE_RESOURCE).to.equal('CREATE_RESOURCE');
      expect(actionTypes.CREATE_RESOURCE_SUCCEED).to.equal('CREATE_RESOURCE_SUCCEED');
      expect(actionTypes.CREATE_RESOURCE_FAIL).to.equal('CREATE_RESOURCE_FAIL');
      expect(actionTypes.CREATE_RESOURCE_RESET).to.equal('CREATE_RESOURCE_RESET');
    });
  });

  describe('createMany', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.CREATE_MANY_RESOURCES).to.equal('CREATE_MANY_RESOURCES');
      expect(actionTypes.CREATE_MANY_RESOURCES_SUCCEED).to.equal('CREATE_MANY_RESOURCES_SUCCEED');
      expect(actionTypes.CREATE_MANY_RESOURCES_FAIL).to.equal('CREATE_MANY_RESOURCES_FAIL');
      expect(actionTypes.CREATE_MANY_RESOURCES_RESET).to.equal('CREATE_MANY_RESOURCES_RESET');
    });
  });

  describe('read', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.READ_RESOURCE).to.equal('READ_RESOURCE');
      expect(actionTypes.READ_RESOURCE_SUCCEED).to.equal('READ_RESOURCE_SUCCEED');
      expect(actionTypes.READ_RESOURCE_FAIL).to.equal('READ_RESOURCE_FAIL');
      expect(actionTypes.READ_RESOURCE_RESET).to.equal('READ_RESOURCE_RESET');
    });
  });

  describe('readMany', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.READ_MANY_RESOURCES).to.equal('READ_MANY_RESOURCES');
      expect(actionTypes.READ_MANY_RESOURCES_SUCCEED).to.equal('READ_MANY_RESOURCES_SUCCEED');
      expect(actionTypes.READ_MANY_RESOURCES_FAIL).to.equal('READ_MANY_RESOURCES_FAIL');
      expect(actionTypes.READ_MANY_RESOURCES_RESET).to.equal('READ_MANY_RESOURCES_RESET');
    });
  });

  describe('update', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.UPDATE_RESOURCE).to.equal('UPDATE_RESOURCE');
      expect(actionTypes.UPDATE_RESOURCE_SUCCEED).to.equal('UPDATE_RESOURCE_SUCCEED');
      expect(actionTypes.UPDATE_RESOURCE_FAIL).to.equal('UPDATE_RESOURCE_FAIL');
      expect(actionTypes.UPDATE_RESOURCE_RESET).to.equal('UPDATE_RESOURCE_RESET');
    });
  });

  describe('updateMany', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.UPDATE_MANY_RESOURCES).to.equal('UPDATE_MANY_RESOURCES');
      expect(actionTypes.UPDATE_MANY_RESOURCES_SUCCEED).to.equal('UPDATE_MANY_RESOURCES_SUCCEED');
      expect(actionTypes.UPDATE_MANY_RESOURCES_FAIL).to.equal('UPDATE_MANY_RESOURCES_FAIL');
      expect(actionTypes.UPDATE_MANY_RESOURCES_RESET).to.equal('UPDATE_MANY_RESOURCES_RESET');
    });
  });

  describe('delete', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.DELETE_RESOURCE).to.equal('DELETE_RESOURCE');
      expect(actionTypes.DELETE_RESOURCE_SUCCEED).to.equal('DELETE_RESOURCE_SUCCEED');
      expect(actionTypes.DELETE_RESOURCE_FAIL).to.equal('DELETE_RESOURCE_FAIL');
      expect(actionTypes.DELETE_RESOURCE_RESET).to.equal('DELETE_RESOURCE_RESET');
    });
  });

  describe('deleteMany', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.DELETE_MANY_RESOURCES).to.equal('DELETE_MANY_RESOURCES');
      expect(actionTypes.DELETE_MANY_RESOURCES_SUCCEED).to.equal('DELETE_MANY_RESOURCES_SUCCEED');
      expect(actionTypes.DELETE_MANY_RESOURCES_FAIL).to.equal('DELETE_MANY_RESOURCES_FAIL');
      expect(actionTypes.DELETE_MANY_RESOURCES_RESET).to.equal('DELETE_MANY_RESOURCES_RESET');
    });
  });
});
