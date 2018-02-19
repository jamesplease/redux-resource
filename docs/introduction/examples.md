# Examples

A number of examples are distributed with the library's
[source code](https://github.com/jamesplease/redux-resource).

### Read Resource

To run this example:

```
git clone https://github.com/jamesplease/redux-resource.git

cd redux-resource/examples/read-resource
npm install
npm start

open http://localhost:3000/
```

This example shows what the most basic usage of Redux Resource looks
like. Two differences between a real-world application and this example are:

- A real-world application would likely use the performant
  [React Redux](https://github.com/reactjs/react-redux) bindings for
  re-rendering.

- A real-world application would likely use [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html)
  so that it could have multiple resources in its state tree.

### Lists and Named Requests

To run this example:

```
git clone https://github.com/jamesplease/redux-resource.git

cd redux-resource/examples/lists-and-named-requests
npm install
npm start

open http://localhost:3000/
```

This example shows how you can use named requests to track requests that
don't target a specific resource ID. It also shows you how lists can be used
to display two different ordered subsets of the same type of resource.

In this example, a user's owned books are fetched, then displayed in a list on
the interface. At the same time, a list of recently released books are also
fetched, and displayed in another list in the interface.

A real-world application would likely use the performant
[React Redux](https://github.com/reactjs/react-redux) bindings for re-rendering.

---

### "Real World" Examples

This is a list of open-source projects that are using Redux Resource.

- [Chronos Timetracker](https://github.com/web-pal/chronos-timetracker): A desktop client
  for JIRA.

- [Zero boilerplate redux](https://github.com/jamesplease/zero-boilerplate-redux): A simple
  recreation of the GitHub Gists webapp.

> Do you have an open source project that uses Redux Resource that you would like to
  add to the list? Open an issue or make a Pull Request!
