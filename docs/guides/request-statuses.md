# Request Statuses

We now know that when Actions with particular types are dispatched,
Resourceful Redux will set some state for us in the store. In this guide, we
will cover how you can use this state in your view layer.

In these examples, we will be writing React components using react-redux. Keep
in mind that this library is agnostic to the view layer, and will work with
any other view system.

### `getStatus`

One of the exports of this library is
[`getStatus`](/docs/api-reference/get-status.md). This function facilitates
using Resourceful Redux data to build your interfaces.

Let's look at an example. Let's say we have a page that displays details about
a book. We might write the following component:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatus } from 'resourceful-redux';

export class BookDetails extends Component {
  render() {
    const { book, readStatus } = this.props;

    return (
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
    );
  }
}

function mapStateToProps(state, props) {
  // A user can pass a `bookId` into this Component to view the book's data
  const bookId = props.bookId;
  const readStatus = getStatus(state, `books.meta.${bookId}.readStatus`, true);
  const book = state.books.resources.find(book => book.id === bookId);

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
Resourceful Redux provides you with very predictable data.

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
import { getStatus } from 'resourceful-redux';
import store from './get-store';

const state = store.getState();

const aggregatedStatus = getStatus(state, [
  'books.meta.23.readStatus',
  'books.label.bookComments.status'
], true);
```

The rules of aggregation work as follows:

- If **any** status is `failed: true`, then the group is `failed: true`.
- If no status is `failed: true`, but at least one is `pending: true`, then the
  group is `pending: true`.
- If **all** statuses are `succeeded: true`, then the group is
  `succeeded: true`.

At most, only one of these values will ever be `true`.

If `isNullPending` (the third argument, see below) is `false`, then all three
values will be `false` if all of the request statuses in the state tree are
`"NULL"`.

### `isNullPending`

The third argument to `getStatus` is a Boolean called `isNullPending`. It
determines whether a request status of `"NULL"` will count as `pending` or not.

Consider an interface that loads a particular book when the page loads. Right
at page load, there will always be a short moment when the request hasn't begun,
yet your store has been set up. At this moment, the request status for this read
will have a value of `"NULL"`.

If you don't pass `true`, then there will be a "flash of no content" unless
you explicitly check for the `"NULL"` status yourself. To avoid this, pass
`isNullPending` as true, and `getStatus` will instead consider that to be a
pending state.

The default value of `isNullPending` is `false`.
