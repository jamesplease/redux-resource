import {updateResourceMeta} from '../../../src';

describe('updateResourceMeta', function() {
  beforeEach(() => {
    this.meta = {
      1: {
        isSelected: false,
        otherData: {
          hungry: true,
          food: 'pizza'
        }
      },
      2: {thirsty: true}
    };
  });

  describe('replace: true', () => {
    it('should replace existing metadata for a resource', () => {
      const result = updateResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        id: 1,
        replace: true
      });

      expect(result).to.deep.equal({
        1: {isSelected: true},
        2: {thirsty: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      // Unchanged items in the store are not cloned
      expect(result[2]).to.equal(this.meta[2]);
    });

    it('should add new metadata for a resource that was not in the store', () => {
      const result = updateResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: 'ok'},
        id: 3,
        replace: true
      });

      expect(result).to.deep.equal({
        1: {
          isSelected: false,
          otherData: {
            hungry: true,
            food: 'pizza'
          }
        },
        2: {thirsty: true},
        3: {isSelected: 'ok'}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // Unchanged items in the store are not cloned
      expect(result[1]).to.equal(this.meta[1]);
      expect(result[2]).to.equal(this.meta[2]);
    });
  });

  describe('replace: false', () => {
    it('should merge existing metadata for a resource', () => {
      const result = updateResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: false},
        id: 1,
        replace: false
      });

      expect(result).to.deep.equal({
        1: {
          isSelected: false,
          otherData: {
            hungry: true,
            food: 'pizza'
          }
        },
        2: {thirsty: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      // Unchanged items in the store are not cloned
      expect(result[2]).to.equal(this.meta[2]);
    });

    it('should add new metadata for a resource that was not in the store', () => {
      const result = updateResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: 'ok'},
        id: 3,
        replace: false
      });

      expect(result).to.deep.equal({
        1: {
          isSelected: false,
          otherData: {
            hungry: true,
            food: 'pizza'
          }
        },
        2: {thirsty: true},
        3: {isSelected: 'ok'}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // Unchanged items in the store are not cloned
      expect(result[1]).to.equal(this.meta[1]);
      expect(result[2]).to.equal(this.meta[2]);
    });
  });
});
