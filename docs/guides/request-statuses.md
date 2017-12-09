# Request Statuses

We now know that when the CRUD action types are dispatched, Redux Resource
will set some metadata about those requests for us in the store. In this guide,
we will cover how you can use this state in your view layer.

In these examples, we will be writing React components using react-redux. Do
keep in mind that nothing in Redux Resource requires React: if you're using Redux
with any other view layer, then this library will work just as well.

### `getStatus`

One of the exports of this library is
[`getStatus`](/docs/api-reference/get-status.md). This function facilitates
using Redux Resource data to build your interfaces, and for this reason it
will likely be the function of Redux Resource that you use the most.

Let's look at an example. Let's say we have a page that displays details about
a book. We might write the following component:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatus } from 'redux-resource';

export class BookDetails extends Component {
  render() {
    const { book, readStatus } = this.props;

    return (
      <div>
        {readStatus.pending && 'Loading...'}
        {readStatus.failed && 'There was an error.'}
        {readStatus.succeeded && (
          <div>
            <span>
              {book.title} ({book.id})
            </span>
            <span>
              {book.releaseYear}, {book.author}
            </span>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  // A user can pass a `bookId` into this Component to view the book's data
  const bookId = props.bookId;
  const readStatus = getStatus(state, `books.meta[${bookId}].readStatus`, true);
  const book = state.books.resources[book.id];

  return {
    book,
    readStatus
  };
}

export default connect(mapStateToProps)(BookDetails);
```

You can see how the object returned from `getStatus` makes a render function
very expressive. It's also convenient that there aren't any checks for
existence here, even though our data is nested in our store: the API of
Redux Resource provides you with very predictable data.

### Aggregating Statuses

Often times, the data displayed on a single page comes from multiple sources.
Whenever possible, we recommend using multiple `getStatus` calls in these
situations, so that you can display information to the user as it becomes
available. This way, if one endpoint is slow, or if the request fails entirely,
the rest of the interface isn't affected by it.

With that said, we know this isn't always possible. Sometimes, you simply
do need to wait for multiple requests to resolve before there is anything
useful to show on the page.

You can use `getStatus` to aggregate these calls together into status. The
API for this is as follows:

```js
import { getStatus } from 'redux-resource';
import store from './get-store';

const state = store.getState();

const aggregatedStatus = getStatus(state, [
  'books.meta.23.readStatus',
  'books.requests.getBookComments.status'
], true);
```

The rules of aggregation work as follows:

- If **any** status is `failed: true`, then the group is `failed: true`.
- If no status is `failed: true`, but at least one is `pending: true`, then the
  group is `pending: true`.
- If **all** statuses are `succeeded: true`, then the group is
  `succeeded: true`.

At most, only one of these values will ever be `true`.

If `treatIdleAsPending` (the third argument, see below) is `false`, then all three
values will be `false` if all of the request statuses in the state tree are
`"IDLE"`.

### `treatIdleAsPending`

The third argument to `getStatus` is a Boolean called `treatIdleAsPending`. It
determines whether a request status of `"IDLE"` will count as `pending` or not.

Consider an interface that loads a particular book when the page loads. Right
at page load, there will always be a short moment when the request hasn't begun,
yet your store has been set up. At this moment, the request status for this read
will have a value of `"IDLE"`.

If you don't pass `true`, then there will be a "flash of no content" unless
you explicitly check for the `"IDLE"` status yourself. To avoid this, pass
`treatIdleAsPending` as true, and `getStatus` will instead consider that to be a
pending state.

The default value of `treatIdleAsPending` is `false`.

##### The Rule of Thumb

There is a rule of thumb for using `treatIdleAsPending`:

- For requests that happen when the page loads, pass `treatIdleAsPending` as `true`
- For requests that happen as a response to a user's action (such as clicking a
  button), pass `treatIdleAsPending` as `false`
