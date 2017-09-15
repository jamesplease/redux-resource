# Usage With React

Like Redux itself, you don't _need_ to use React with Resourceful Redux,
but the two do work well together. We recommend using the
[react-redux](https://github.com/reactjs/react-redux) library to handle
[using Redux with React](http://redux.js.org/docs/basics/UsageWithReact.html).

If you're using react-redux, there are a few patterns that we find ourselves
using frequently with Resourceful.

### Using `mapStateToProps`

We recommend placing your calls to [`getResources`](/docs/api-reference/get-resources.md)
and [`getStatus`](/docs/api-reference/get-status.md) within
`mapStateToProps`. That way, you can access this information from any of the
component's lifecycle methods, without needing to compute them for each method.

For example:

```js
import { getResources, getStatus } from 'resourceful-redux';

function mapStateToProps(state) {
  const searchedBooks = getResources(state, 'books', 'searchResults');
  const searchStatus = getStatus(state, 'books.requests.getSearchResults.status');

  return {
    searchedBooks,
    searchStatus
  };
}
```

These methods are generally performant enough when used in this way. If
you do see performance issues due to these calls, we recommend using
[reselect](https://github.com/reactjs/reselect), which will further reduce the
number of times that the values are computed. You probably don't won't need to
do this, though – only do it if you're sure that you need to.

### Type Checking with Prop Types

Resourceful Prop Types exports a number of helpful prop types for common props
that you'll pass into your React Components. Read the [Resourceful Prop Types
documentation](/docs/extras/resourceful-prop-types.md) for more.

### Using Statuses

The return value of `getStatus` is an object with four boolean values on it,
representing each of the four request statuses. Because only one of those values
is ever `true`, you can write expressive code in your render function to handle
the different request statuses.

```jsx
render() {
  const { searchedBooks, searchStatus } = this.props;

  return (
    <div>
      {searchStatus.pending && ('Loading...')}
      {searchStatus.failed && (
        <div>
          There was an error running your search.
          <button onClick={this.performSearch}>
            Retry.
          </button>
        </div>
      )}
      {searchStatus.succeeded && (
        <ul>
          {searchedBooks.map(book => (
            <li key={book.id}/>
              {book.title} - {book.releaseYear}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Determining When a Request Succeeds

Sometimes, you want to know the exact moment that a request succeeds. Redux
doesn't provide an event system for things like this (for better or worse), so
you must instead check the previous state with the next state to determine when
a request changes from one status to the other.

We recommend performing this check within `componentWillReceiveProps`. This
might look like:

```js
import { getResources, getStatus } from 'resourceful-redux';

class BooksList extends Component {
  render() {
    // Render contents here
  }

  // Let's log to the console whenever a search result succeeds
  componentWillReceiveProps(nextProps) {
    const { searchStatus } = this.props;

    // Bail if the request wasn't previously pending (requests can only succeed
    // if they've been started!)
    if (!searchStatus.pending) {
      return;
    }

    const nextSearchStatus = getStatus(nextProps, 'books.requests.getSearchResults.status');

    if (nextSearchStatus.succeeded) {
      console.log('The search request just succeeded.');
    }
  }
}


function mapStateToProps(state) {
  const books = state.books;
  const searchStatus = getStatus(state, 'books.requests.getSearchResults.status');

  return {
    searchStatus,
    books
  };
}
```
