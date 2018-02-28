import { upsertResources } from '../../../src';
import { resetCodeCache } from '../../../src/utils/warning';

describe('upsertResources', function() {
  beforeEach(() => {
    resetCodeCache();

    this.resources = {
      1: { id: 1, first_name: 'james', last_name: 'please' },
      5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
      7: { id: 7, first_name: 'shilpa', last_name: 'm' },
    };
  });

  it('should warn when a resource without an ID is passed', () => {
    stub(console, 'error');

    upsertResources(this.resources, [{ id: 23 }, { name: 'sandwich' }]);

    expect(console.error.callCount).to.equal(1);
  });

  it('should not warn when a resource with an ID of 0 is passed', () => {
    stub(console, 'error');

    upsertResources(this.resources, [{ id: 0 }]);

    expect(console.error.callCount).to.equal(0);
  });

  it('should accept an empty array of newResources', () => {
    const nullResult = upsertResources(this.resources, null);
    expect(nullResult).to.equal(this.resources);

    const notDefinedResult = upsertResources(this.resources);
    expect(notDefinedResult).to.equal(this.resources);
  });

  describe('merge: false', () => {
    it('should replace the data for "matched" resources', () => {
      const result = upsertResources(
        this.resources,
        [{ id: 1, first_name: 'oink' }, 5],
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'oink' },
        5: { id: 5 },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
    });

    it('should replace the data for "matched" resources when a `newResources` object is passed', () => {
      const result = upsertResources(
        this.resources,
        {
          1: { id: 1, first_name: 'oink' },
          5: { id: 5 },
        },
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'oink' },
        5: { id: 5 },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
    });

    it('should add a brand new resource', () => {
      const result = upsertResources(
        this.resources,
        [{ id: 10, first_name: 'oink' }],
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'james', last_name: 'please' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
        10: { id: 10, first_name: 'oink' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
    });

    it('should add a brand new resource when a `newResources` object is passed', () => {
      const result = upsertResources(
        this.resources,
        { 10: { id: 10, first_name: 'oink' } },
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'james', last_name: 'please' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
        10: { id: 10, first_name: 'oink' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
    });

    it('should add a brand new resource with the ID shorthand', () => {
      const result = upsertResources(this.resources, [10], false);

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'james', last_name: 'please' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
        10: { id: 10 },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
    });
  });

  describe('merge: true', () => {
    it('should keep "unmatched" resources in the store, and merge the data for "matched" resources', () => {
      const result = upsertResources(
        this.resources,
        [{ id: 1, first_name: 'oink' }],
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'oink' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[1]).to.not.equal(this.resources[1]);
      // Unrelated resources are unchanged
      expect(result[5]).to.equal(this.resources[5]);
      expect(result[7]).to.equal(this.resources[7]);
    });

    it('should keep "unmatched" resources in the store, and merge the data for "matched" resources when a `newResources` object is passed', () => {
      const result = upsertResources(
        this.resources,
        { 1: { id: 1, first_name: 'oink' } },
        false
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'oink' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[1]).to.not.equal(this.resources[1]);
      // Unrelated resources are unchanged
      expect(result[5]).to.equal(this.resources[5]);
      expect(result[7]).to.equal(this.resources[7]);
    });

    it('should keep "unmatched" resources in the store, and merge the data for "matched" resources with resources shorthand', () => {
      const result = upsertResources(this.resources, [1], false);

      expect(result).to.deep.equal({
        1: { id: 1 },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
      // The modified resource is shallow cloned
      expect(result[1]).to.not.equal(this.resources[1]);
      // Unrelated resources are unchanged
      expect(result[5]).to.equal(this.resources[5]);
      expect(result[7]).to.equal(this.resources[7]);
    });

    it('should add a brand new resource', () => {
      const result = upsertResources(
        this.resources,
        [{ id: 10, first_name: 'oink' }],
        true
      );

      expect(result).to.deep.equal({
        1: { id: 1, first_name: 'james', last_name: 'please' },
        5: { id: 5, first_name: 'stephen', last_name: 'rjr' },
        7: { id: 7, first_name: 'shilpa', last_name: 'm' },
        10: { id: 10, first_name: 'oink' },
      });

      // Shallow clones the resources obj
      expect(result).to.not.equal(this.resources);
      // Unrelated resources are unchanged
      expect(result[1]).to.equal(this.resources[1]);
      expect(result[5]).to.equal(this.resources[5]);
      expect(result[7]).to.equal(this.resources[7]);
    });
  });
});
