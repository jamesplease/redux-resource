import {actionTypes} from '../../src';

describe('actionTypes', function() {
  it('should be an object', () => {
    expect(actionTypes).to.be.an('object');
  });

  describe('create', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.CREATE_RESOURCES).to.equal('CREATE_RESOURCES');
      expect(actionTypes.CREATE_RESOURCES_SUCCEED).to.equal('CREATE_RESOURCES_SUCCEED');
      expect(actionTypes.CREATE_RESOURCES_FAIL).to.equal('CREATE_RESOURCES_FAIL');
      expect(actionTypes.CREATE_RESOURCES_RESET).to.equal('CREATE_RESOURCES_RESET');
    });
  });

  describe('read', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.READ_RESOURCES).to.equal('READ_RESOURCES');
      expect(actionTypes.READ_RESOURCES_SUCCEED).to.equal('READ_RESOURCES_SUCCEED');
      expect(actionTypes.READ_RESOURCES_FAIL).to.equal('READ_RESOURCES_FAIL');
      expect(actionTypes.READ_RESOURCES_RESET).to.equal('READ_RESOURCES_RESET');
    });
  });

  describe('update', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.UPDATE_RESOURCES).to.equal('UPDATE_RESOURCES');
      expect(actionTypes.UPDATE_RESOURCES_SUCCEED).to.equal('UPDATE_RESOURCES_SUCCEED');
      expect(actionTypes.UPDATE_RESOURCES_FAIL).to.equal('UPDATE_RESOURCES_FAIL');
      expect(actionTypes.UPDATE_RESOURCES_RESET).to.equal('UPDATE_RESOURCES_RESET');
    });
  });

  describe('delete', () => {
    it('should have the right actionTypes', () => {
      expect(actionTypes.DELETE_RESOURCES).to.equal('DELETE_RESOURCES');
      expect(actionTypes.DELETE_RESOURCES_SUCCEED).to.equal('DELETE_RESOURCES_SUCCEED');
      expect(actionTypes.DELETE_RESOURCES_FAIL).to.equal('DELETE_RESOURCES_FAIL');
      expect(actionTypes.DELETE_RESOURCES_RESET).to.equal('DELETE_RESOURCES_RESET');
    });
  });
});
