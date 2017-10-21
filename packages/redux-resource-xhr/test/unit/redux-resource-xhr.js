import {
  crudAction, createResources, readResources, updateResources, deleteResources,
  __RewireAPI__
} from '../../src';

describe('Redux Resource XHR', function() {
  beforeEach(() => {
    this.dispatch = stub();
  });

  describe('performXhr', () => {
    beforeEach(() => {
      stub(console, 'warn');
      this.performXhr = __RewireAPI__.__GetDependency__('performXhr');
    });

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('xhr');
    });

    describe('warnings', () => {
      beforeEach(() => {
        this.xhrStub = stub();
        __RewireAPI__.__Rewire__('xhr', this.xhrStub);
      });

      it('should not warn when the minimum options are provided', () => {
        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'read',
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(0);
      });

      it('should warn when a url/uri is not provided', () => {
        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'read'
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when a resourceName is not provided', () => {
        this.performXhr(this.dispatch, {
          crudAction: 'read',
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when an invalid `crudAction` is provided', () => {
        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'apples',
          xhrOptions: {
            url: 'https://www.google.com'
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });

      it('should warn when a `crudAction` is not provided', () => {
        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          xhrOptions: {
            url: 'https://www.google.com',
          }
        });

        expect(console.warn.callCount).to.equal(1);
      });
    });

    describe('when the request is aborted', () => {
      it('should dispatch the correct actions', (done) => {
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb();

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 0,
              resources: [21, 42],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_NULL',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 0,
              res: undefined,
              resources: [21, 42],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            done();
          });

          return {
            aborted: true
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'read',
          resources: [21, 42],
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });

      it('should invoke the `callback` after the xhr is complete with the right arguments', (done) => {
        const callbackStub = stub();
        const body = [{id: 1}, {id: 2}];
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            // The action creator callback receives `(err, res, body)` from xhr
            cb(null, {body}, body);

            expect(callbackStub.callCount).to.equal(1);
            expect(callbackStub).to.be.calledWithExactly(null, {body}, body);
            expect(callbackStub).to.be.calledAfter(this.dispatch);

            done();
          });

          return {
            aborted: true
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {}, callbackStub);
        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, with a body', () => {
      it('should dispatch the correct actions', (done) => {
        const body = [
          {id: 21},
          {id: 42}
        ];

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 200,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 0,
              resources: [21, 42],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 200,
              res: {
                statusCode: 200,
                body
              },
              resources: [
                {id: 21},
                {id: 42}
              ],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'read',
          resources: [21, 42],
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, with a body + transformData fn', () => {
      it('should dispatch the correct actions', (done) => {
        const body = {
          data: [
            {id: 21},
            {id: 42}
          ]
        };

        const transformData = body => body.data;

        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 201,
                body
              },
              body
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'GET'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'READ_RESOURCES_PENDING',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 0,
              resources: [21, 42],
              transformData,
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'READ_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              crudAction: 'read',
              statusCode: 201,
              res: {
                statusCode: 201,
                body
              },
              resources: [
                {id: 21},
                {id: 42}
              ],
              transformData,
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'GET'
              }
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'read',
          resources: [21, 42],
          transformData,
          xhrOptions: {
            method: 'GET',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('success, without a body', () => {
      it('should dispatch the correct actions', (done) => {
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(
              null,
              {
                statusCode: 204
              }
            );

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'DELETE'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_PENDING',
              resourceName: 'hello',
              crudAction: 'delete',
              statusCode: 0,
              resources: [1, 14],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'DELETE'
              }
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'DELETE_RESOURCES_SUCCEEDED',
              resourceName: 'hello',
              crudAction: 'delete',
              statusCode: 204,
              resources: [1, 14],
              res: {
                statusCode: 204
              },
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'DELETE'
              }
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'delete',
          resources: [1, 14],
          xhrOptions: {
            method: 'DELETE',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });

    describe('when the request errors, without a status code', () => {
      it('should dispatch the correct actions', (done) => {
        const err = new Error('oops');
        this.xhrStub = stub().callsFake((options, cb) => {
          setTimeout(() => {
            cb(err);

            expect(options).to.deep.equal({
              url: 'https://www.google.com',
              method: 'DELETE'
            });

            expect(this.dispatch.callCount).to.equal(2);
            expect(this.dispatch.args[0]).to.deep.equal([{
              type: 'DELETE_RESOURCES_PENDING',
              resourceName: 'hello',
              crudAction: 'delete',
              statusCode: 0,
              resources: [1, 14],
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'DELETE'
              }
            }]);

            expect(this.dispatch.args[1]).to.deep.equal([{
              type: 'DELETE_RESOURCES_FAILED',
              resourceName: 'hello',
              crudAction: 'delete',
              statusCode: 0,
              resources: [1, 14],
              err,
              res: undefined,
              xhrOptions: {
                url: 'https://www.google.com',
                method: 'DELETE'
              }
            }]);

            done();
          });

          return {
            aborted: false
          };
        });

        __RewireAPI__.__Rewire__('xhr', this.xhrStub);

        this.performXhr(this.dispatch, {
          resourceName: 'hello',
          crudAction: 'delete',
          resources: [1, 14],
          xhrOptions: {
            method: 'DELETE',
            url: 'https://www.google.com'
          }
        });

        expect(this.xhrStub.callCount).to.equal(1);
      });
    });
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
          dispatch: this.dispatch,
          crudAction: 'read',
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com',
            method: 'GET',
          }
        });

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
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

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({
          dispatch: this.dispatch
        }, postXhr);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch
        }, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('createResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = createResources({
          dispatch: this.dispatch,
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        });

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
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

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({
          dispatch: this.dispatch
        }, postXhr);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
        }, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('readResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = readResources({
          dispatch: this.dispatch,
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        });

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
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

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({
          dispatch: this.dispatch
        }, postXhr);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch
        }, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('updateResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = updateResources({
          dispatch: this.dispatch,
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        });

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
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

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({
          dispatch: this.dispatch
        }, postXhr);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch
        }, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });

    describe('deleteResources', () => {
      it('should pass the right arguments to `performXhr`', () => {
        const xhr = deleteResources({
          dispatch: this.dispatch,
          resourceName: 'books',
          xhrOptions: {
            url: 'http://www.google.com'
          }
        });

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch,
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

      it('should pass a `callback` to `performXhr` when provided', () => {
        const postXhr = () => 'pizza';
        const xhr = crudAction({
          dispatch: this.dispatch
        }, postXhr);

        expect(this.performXhrStub).to.have.been.calledWithExactly(this.dispatch, {
          dispatch: this.dispatch
        }, postXhr);

        expect(xhr).to.deep.equal({
          aborted: false
        });
      });
    });
  });
});
