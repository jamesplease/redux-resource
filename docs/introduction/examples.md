# Examples

A number of examples are distributed with the library's
[source code](https://github.com/jmeas/resourceful-redux).

### Read Resource

To run this example:

```
git clone https://github.com/jmeas/resourceful-redux.git

cd resourceful-redux/examples/read-resource
npm install
npm start

open http://localhost:3000/
```

This example shows what the most basic usage of Resourceful Redux looks
like. Two differences between a real-world application and this example are:

- A real-world application would likely use the performant
  [React Redux](https://github.com/reactjs/react-redux) bindings for
  re-rendering.

- A real-world application would likely use [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html)
  so that it could have multiple resources in its state tree.

### Labels: Read Many

To run this example:

```
git clone https://github.com/jmeas/resourceful-redux.git

cd resourceful-redux/examples/labels
npm install
npm start

open http://localhost:3000/
```

This example shows one of the main uses of labels: displaying two different
lists of the same type of resource. In this example, a user's owned books are
fetched, then displayed in a list on the interface. At the same time, a list of
recently released books are also fetched, and displayed in another list in the
interface.

A real-world application would likely use the performant
[React Redux](https://github.com/reactjs/react-redux) bindings for re-rendering.
