# Usage With React

It is not a requirement you you use React to use Redux Resource, but the two work
well together. We recommend using the [react-redux](https://github.com/reactjs/react-redux)
library to [link Redux with React](http://redux.js.org/docs/basics/UsageWithReact.html).

The following are some patterns that we find ourselves using frequently with Redux Resource.

### Using `mapStateToProps`

We recommend placing your calls to [`getResources`](/docs/api-reference/get-resources.md)
and [`getStatus`](/docs/api-reference/get-status.md) within
`mapStateToProps`. That way, you can access this information from any of the
component's lifecycle methods, without needing to compute them within each method.

For example:

```js
import { getResources, getStatus } from 'redux-resource';

function mapStateToProps(state) {
  const searchedBooks = getResources(state.books, 'searchResults');
  const searchStatus = getStatus(state, 'books.requests.getSearchResults.status');

  return {
    searchedBooks,
    searchStatus
  };
}
```

### Type Checking with Prop Types

Redux Resource Prop Types exports a number of helpful prop types for common props
that you'll pass into your React Components. Read the [Redux Resource Prop Types
documentation](/docs/extras/redux-resource-prop-types.md) for more.

### Using Request Statuses

This is such an important topic that there is a
[dedicated guide for it](/docs/other-guides/using-request-statuses.md).

### Determining When a Request Succeeds

Sometimes, you want to know the exact moment that a request succeeds. You can do this
within your components by comparing the previous state with the next state to determine
when a request changes from one status to another.

We recommend performing this check within `componentWillReceiveProps`. This
might look like:

```js
import { getResources, getStatus } from 'redux-resource';

class BooksList extends Component {
  render() {
    // Render contents here
  }

  // Let's log to the console whenever a search result succeeds
  componentWillReceiveProps(nextProps) {
    if (this.props.searchStatus.pending && nextProps.searchStatus.succeeded) {
      console.log('The search request just succeeded.');
    }
  }
}


function mapStateToProps(state) {
  const searchStatus = getStatus(state, 'books.requests.getSearchResults.status');

  return {
    searchStatus
  };
}
```

This same approach can also be used to detect the moment that a request fails.