# Canceling Requests

Many applications transfer data using HTTP requests. One feature of HTTP
requests is that they can be cancelled.

As a rule of thumb, for each request that you make in your application, there
will always be one situation where you will want to cancel that request to
prevent bugs.

### Why do it

Canceling requests prevents race conditions. A race condition occurs when you
have two requests in flight at the same time, but your code is written such that
one must resolve before the other. As you may know, requests can resolve
in any order, which leads to the bugs.

A common pattern we've seen in Redux applications is this:

1. whenever a request completes, an action is dispatched
2. a reducer responds to that action, updating the state
3. a view renders using the latest data from the state

This pattern isn't bad – it's great! You just need to be aware that
it can lead to bugs when requests aren't cancelled.

Let's look at two examples that demonstrate the problem.

#### Example: A Typeahead

Consider a "typeahead" component that allows a user to type to search for books.
Even when the user's input is debounced, there are situations where two (or more)
active requests can be in flight. The user can type, wait a moment for a request
to send, then type one key to fire off a second request. If the backend response
time is slower than the debounce time, then two search requests will be in
flight at once.

Because the requests can complete in any order, it is possible that the user's
earliest search results will return _after_ their latest search results. If
your code is written such that the last-received search results are displayed,
then that can lead to the wrong search results being shown.

Canceling a previous request resolves this problem, as it means that only one
search request will ever be in flight at a time, and it will be the user's most
recent search. If you're using an action creator that returns a native
XMLHttpRequest object, such as the action creator from
[Redux Resource XHR](../extras/redux-resource-xhr.md), then your code may look
like this:

```js
class Typeahead extends Component {
  searchBooks: function(query) {
    if (this.searchBooksRequest) {
      this.searchBooksRequest.abort();
    }

    this.searchBooksRequest = this.props.searchBooks(query);
  }
}
```

Another tip is to cancel any requests when the component unmounts. If the search
results aren't needed when the component unmounts, then letting a request complete
will still update your state tree, which can cause unnecessary renders in your
application. Canceling requests in `componentWillUnmount` might look something
like:

```js
class Typeahead extends Component {
  componentWillUnmount: function() {
    if (this.searchBooksRequest) {
      this.searchBooksRequest.abort();
    }
  }
}
```

#### Example: Pagination

Consider a page of an application that displays books. Often, long lists of
resources will be paginated, and a user can move between the pages by clicking a
"next" or "previous" button.

A race condition can occur when the user clicks the buttons too fast, or when
the backend service is slow. If your view layer renders out the results of the
latest response, then it's possible that they could see the results from the
wrong page.

Similar to the search example above, ensuring that only a single page of data
is being fetched at once is the solution.

The solution is the same as the typeahead example:

1. cancel any existing page-change requests before starting a new one
2. consider if it makes sense to cancel the request when the component
  unmounts

A common feature of these bugs is that they depend on unreliable network
conditions, so they don't usually come up in a development environment. This
makes them easy to ignore, but they're still worth protecting against.

### How to do it

Typically, applications do not need to inform the user when a request is aborted.
Accordingly, Redux Resource does not track if a request is in an aborted state. Instead,
we encourage you to set the request status back to `"IDLE"` when the request is canceled.

For a read request, this may look something like:

```js
import { actionTypes } from 'redux-resource';

// You will need to determine that the request was aborted;
// different libraries have different systems for doing this
let requestWasAborted;

if (requestWasAborted) {
  dispatch({
    type: actionTypes.READ_RESOURCES_IDLE,
    ...otherActionAttributes
  })
}
```

> Note: If your application requires tracking the aborted status of a request, you
  can write a [plugin](../other-guides/plugin.md) to add support for additional action types.


> Note: We understand that some users want their action type names to reflect the action
  that is being performed, rather than the result of the action. We agree that this is a good
  practice to follow. If you do, too, it may irritate you that there is no `READ_RESOURCES_ABORT`
  action type. This is omitted in an effort to keep the surface area of Redux Resource small,
  since that action would behave the same as `READ_RESOURCES_IDLE`.

### Canceling requests in popular libraries

There are many different tools developers use to make requests. In this section,
we will go through how to cancel requests using some of the most common tools.

#### XMLHttpRequest

In browsers, the native way to cancel a request is to call the `abort` method
on an [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

```js
const myRequest = new XMLHttpRequest();
myRequest.open('GET', 'books');

myRequest.abort();
```

#### xhr

The [xhr](https://github.com/naugtur/xhr) library simplifies the creation of
XHR objects. Because it returns a native XMLHttpRequest object, canceling
requests with `xhr` is the same as when you use the native XMLHttpRequest
constructor.

```js
import xhr from 'xhr';

const request = xhr.get('/books/23', (err, res) => {
  if (req.aborted) {
    console.log('Request cancelled');
  }
});

request.abort();
```

[Redux Resource XHR](../extras/redux-resource-xhr.md) for 
Redux Resource uses [`xhr`](https://github.com/naugtur/xhr) for requests.
The action creator exported by this library returns a native XHR object, so you
can use the `abort` method to cancel those requests.

#### fetch

The native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
method is a tool for making requests that returns a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
Native Promises cannot be cancelled ([yet](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)),
but you can get around this limitation by "ignoring" the server response.

One way to do this is to create a function that you return from your action creators.
Then, only fire the "success" action as long as that function is not called.

Although there are benefits to actually canceling the request, this solution will
avoid the race condition bugs described in this guide.

#### axios

[axios](https://github.com/mzabriskie/axios) is a Promise-based approach to HTTP
requests that supports cancellation. It uses a system of canceling Promises
called "Cancel Tokens," which is based off of
[a withdrawn cancelable Promises proposal](https://medium.com/@benlesh/promise-cancellation-is-dead-long-live-promise-cancellation-c6601f1f5082).

To see how to cancel axios requests, refer to
[the axios documentation](https://github.com/mzabriskie/axios#cancellation).

#### Bluebird

[Bluebird](http://bluebirdjs.com/) is Promise implementation that supports
cancellation using an `onCancel` method.

Refer to [the Bluebird documentation](http://bluebirdjs.com/docs/api/cancellation.html)
for specifics on the `onCancel` method.

#### Observables in RxJS

[RxJS](http://reactivex.io/rxjs/) is a Reactive Programming library for async code using Observables. It includes [`Observable.ajax()`](https://chrisnoring.gitbooks.io/rxjs-5-ultimate/content/operators-and-ajax.html) for HTTP requests and supports cancellation by calling `subscription.unsubscribe()`, or using something like [`.takeUntil()`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil).

If you happen to be using redux-observable, refer to that library's documentation
for
[a recipe for request cancellation](https://redux-observable.js.org/docs/recipes/Cancellation.html).

### Alternatives

You don't always need to cancel requests. Two other options are:

1. Prevent the user from performing an action more than once. For instance, in
  the search example, you could prevent the user from typing if a search of theirs
  is already in flight. And in the pagination example, you can disable the
  "next" and "previous" buttons until the new page loads. In these examples,
  this approach is clearly a subpar experience, but sometimes it does make
  sense. For instance, disabling a "Delete" button for a book once the user
  clicks it once, or disabling a "Buy" button after the user confirms a
  purchase.

2. You could write code to keep track of which request's response is the correct
  one to display. We generally find it to be simpler to cancel requests instead.

There may be other options, too, and different approaches may make more sense to
you based on the situation.
