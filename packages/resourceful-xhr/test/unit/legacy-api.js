import {
  crudAction, createResources, readResources, updateResources, deleteResources,
  __RewireAPI__
} from '../../src';

describe('Resourceful XHR (Legacy API)', function() {
  beforeEach(() => {
    this.state = {
      name: 'pizza',
      age: 23
    };
    this.dispatch = stub();
    this.getState = stub().returns(this.state);
  });

  // Wrappers are all of the functions that wrap `performXhr`.
  // We test that they pass predictable arguments to `performXhr`.
  describe('wrappers', () => {
    beforeEach(() => {
      this.performXhrStub = stub().returns({aborted: false});
      __RewireAPI__.__Rewire__('performXhr', this.performXhrStub);
    });

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('performXhr');
    });

    describe('crudAction', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = crudAction({
          crudAction: 'read',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'read',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass the right arguments to `performXhr` when options is a fn', () => {
        const xhr = crudAction((state) => {
          return {
            crudAction: 'read',
            name: state.name,
            resourceName: 'books',
            xhrOptions: {
              url: 'http://www.google.com',
              method: 'GET',
            }
          };
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'read',
          resourceName: 'books',
          name: 'pizza',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({}, postXhr)(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {}, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('createResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = createResources({
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'create',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'POST',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass the right arguments to `performXhr` when options is a fn', () => {
        const xhr = createResources((state) => {
          return {
            name: state.name,
            resourceName: 'books',
            xhrOptions: {
              url: 'http://www.google.com'
            }
          };
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'create',
          resourceName: 'books',
          name: 'pizza',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'POST',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({}, postXhr)(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {}, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('readResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = readResources({
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'read',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass the right arguments to `performXhr` when options is a fn', () => {
        const xhr = readResources((state) => {
          return {
            name: state.name,
            resourceName: 'books',
            xhrOptions: {
              url: 'http://www.google.com'
            }
          };
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'read',
          resourceName: 'books',
          name: 'pizza',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({}, postXhr)(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {}, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('updateResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = updateResources({
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'update',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'PATCH',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass the right arguments to `performXhr` when options is a fn', () => {
        const xhr = updateResources((state) => {
          return {
            name: state.name,
            resourceName: 'books',
            xhrOptions: {
              url: 'http://www.google.com'
            }
          };
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'update',
          resourceName: 'books',
          name: 'pizza',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'PATCH',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({}, postXhr)(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {}, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('deleteResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = deleteResources({
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'delete',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'DELETE',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass the right arguments to `performXhr` when options is a fn', () => {
        const xhr = deleteResources((state) => {
          return {
            name: state.name,
            resourceName: 'books',
            xhrOptions: {
              url: 'http://www.google.com'
            }
          };
        })(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          crudAction: 'delete',
          resourceName: 'books',
          name: 'pizza',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'DELETE',
          }
        }, undefined);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({}, postXhr)(this.dispatch, this.getState);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {}, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });
  });
});
