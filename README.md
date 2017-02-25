# redux-simple-resource

A Redux framework for interacting with remote resources.

[![Travis build status](http://img.shields.io/travis/jmeas/redux-simple-resource.svg?style=flat)](https://travis-ci.org/jmeas/redux-simple-resource)
[![Test Coverage](https://codeclimate.com/github/jmeas/redux-simple-resource/badges/coverage.svg)](https://codeclimate.com/github/jmeas/redux-simple-resource)

### Table of Contents

- [Motivation](#motivation)
  - [Features](#features)
  - [Why This Project?](#why-this-project)
- [Getting Started](#getting-started)
- [API](#api)
  - [createResource](#createresource-resourcename-options-)
  - [xhrStatuses](#xhrstatuses)
- [Guides](#guides)
  - [Resource Names](#resource-names)
  - [Resource Metadata](#resource-metadata)
  - [XHR Statuses](#xhr-statuses)
  - [Action Types](#action-types)
  - [Shallow Cloning](#shallow-cloning)
  - [What is a "simple" resource?](#what-is-a-simple-resource)

### Motivation

Use this project to reduce Redux boilerplate when CRUD'ing remote resources.

#### Features

✓ Reducers, action types, and initial state created for you  
✓ All features are opt-out: pick and choose what works for you  
✓ Store ["metadata"](#resource-metadata) for resources and resource lists  
✓ Works well with most APIs  
✓ Unopinionated technology decisions  

#### Why this project?

There are numerous projects with the same goal as this library. The primary
difference between this library and other options is that this library
[stores metadata about resources separately from the resource itself](#resource-metadata).

### Getting started

Install this library through [npm ⇗](https://www.npmjs.com).

`npm install redux-simple-resource`

Then, import it and create a resource.

```js
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createResource from 'redux-simple-resource';

// `options` is optional, and is documented in the "API" section of this README
const book = createResource('book', options);

// Include its reducers in your store
const reducers = combineReducers({
  book.reducers,
  ...myOtherReducers
});

const store = createStore(reducers);
```

## API

This library exports two objects: the default export, `createResource`, and a
named export, `xhrStatuses`.

### `createResource( resourceName, [options] )`

This is the default export of this library. Be sure to pass a singular version
of your resource as `resourceName`. For instance, if this resource is for
"books", then `resourceName` should be "book". The `resourceName` is used
to generate action types. For more, read
[the guide on Resource Names](#resource-names).

This method returns an object with the following properties:

| Name | Description |
|------|-------------|
|reducer | A reducer that manages CRUD'ing the resource |
|pluralForm | The pluralized name of `resourceName` ([Read more](#resource-names)) |
|actionTypes | The CRUD action types to be used in user-defined action creators ([Read more](#action-types)) |
|initialState | The initial state to be returned by reducer |

The second parameter, `options`, is an optional object that can be used to
customize all of the default behavior. All options are optional. Read about the
different options below:

##### `pluralForm`

Pass the pluralized version of your resource's name. By default, an "s" is
appended to your resource's name. This name is used in action types for
actions that affect more than one resource.

```js
const person = createResource('person', {
  pluralForm: 'people'
});

person.pluralForm;
// => `people`
```

```js
const cat = createResource('cat');

cat.pluralForm;
// => `cats`
```

The plural form of a resource is used for action types that affect more than
one resource. For more, read [the guide on resource names](#resource-names).

##### `supportedActions`

Action types will be created for all CRUD actions, and the generated reducer
supports all of those actions. Sometimes, you won't need to support all CRUD
actions on a resource. In those situations, you can use this to disable the
creation of particular action types. The five CRUD actions are:

- `readOne`
- `readMany`
- `create`
- `update`
- `delete`

Pass `false` as the value for any of these to prevent those action types
and reducers from being created.

Keep in mind that you may not choose to use this option, even if your resource
only supports a subset of CRUD. You could simply choose to not use the other
generated action types, and there would be no issues with you doing that. It's
up to you.

```js
// Only "READ_MANY" action types and reducers will be created for this
// "cat" resource.
const cat = createResource('cat', {
  supportedActions: {
    readOne: false,
    readMany: true,
    del: false,
    update: false,
    create: false
  }
});
```

##### `idAttribute`

The `id` property of a resource is special, as it is used to uniquely identify
that resource within your list of resources. This allows redux-simple-resource
to keep your resources up-to-date as you make changes to them.

By default, redux-simple-resource looks for an attribute called "id". If your
resource has an ID by some other value, you have two choices: you can either
rename it to be ID, or use this option to update what redux-simple-resource
will look for.

```js
const movie = createResource('movie', {
  idAttribute: 'movieId'
});
```

##### `initialState`

Additional initial state to add to the default initial state. The default
initial state is:

```js
{
  // These are the actual resources that the server sends back.
  resources: [],
  // This is metadata about _specific_ resources. For instance, if a DELETE
  // is in flight for a book with ID 24, then you could find that here.
  // For more, see the Resource Meta guide in this README.
  resourcesMeta: {},
  // This is metadata about the entire collection of resources. For instance,
  // on page load, you might fetch all of the resources. The XHR status for
  // that request would live here.
  // For more, see the Resource Meta guide in this README.
  resourcesListMeta: {
    retrievingStatus: xhrStatuses.NULL,
    creatingStatus: xhrStatuses.NULL
  }
}
```

Example usage is below:

```js
const food = createResource('food', {
  initialState: {
    // Add this property to the default initial state. Custom action reducers
    // could be used to modify this property. For more, see the `actionReducers`
    // option.
    peopleAreHungry: true
  }
});
```

##### `actionReducers`

You will likely need to handle more action types than the built-in CRUD action
types. You can add in custom reducers to handle individual action types with
this option.

You may be used to `createReducers()` in Redux, which associates a reducer
with a particular "slice" of your store. This is similar, except each reducer
is for a particular action type.

Pass in an Array of objects that define an `actionType` and `reducer`, where
the `actionType` is the type to associate with `reducer`.

The `reducer` is like any other reducer in Redux: it receives two arguments,
and should return the new state.

```
(state, action) => newState
```

If you use switch statements in your reducers, then this feature is just like
defining a new `case` block in your switch statement.

```js
const pet = createResource('pet', {
  actionReducers: [
    {
      type: 'SELECT_PET',
      reducer(state, action) {
        // Modify the state as necessary...
        var newState = generateNewState(state);

        // Then return it.
        return newState;
      }
    }
  ]
})
```

### `xhrStatuses`

This is a named export from this library. It is an Object that represents
the different states that an XHR request can be in.

```js
// xhrStatuses
{
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  ABORTED: 'ABORTED',
  NULL: 'NULL'
}
```

For an explanation of what each of these means, refer to
[the XHR Statuses guide](#xhr-statuses).

You will usually use this object to determine the state of XHR requests for your
resources. Let's see what this might look like:

```js
import React, {Component} from 'react';
import {xhrStatuses} from 'redux-simple-resource';

// Within a component's render, you may use it to conditionally render some JSX.
class MyComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // This is a value that is pulled from the store, and automatically kept
    // up-to-date for you. For more, see the Guides section below.
    const {resourceMeta} = this.props;

    // Render loading text if a retrieve request is in flight
    if (resourceMeta.retrievingStatus === xhrStatuses.PENDING) {
      return (<div>Loading data</div>);
    } else {
      return (<div>Not loading data</div>);
    }
  }
}
```

## Guides

### Resource Names

The first argument to `createResource` is `resourceName`, which is used to build
the CRUD action types for your resource. Under-the-hood, a plural version of the
name is generated, which is returned to you as `pluralForm` on the resource
object (The default pluralized version is just ``${resourceName}s``, although
you can customize this with the [`pluralForm`](#pluralform) option).

The singular version of the resource name is used for action types that operate
on a single resource. The plural version is used for action types that operate
on multiple resources.

For instance, these are the action types that represent kicking off a request
for each of the built-in CRUD operations:

```js
// This operates on many resources
`READ_MANY_BOOKS`

// These operate on a single resource
`READ_ONE_BOOK`
`DELETE_BOOK`
`UPDATE_BOOK`
`CREATE_BOOK`
```

For now, redux-simple-resource only supports reads of multiple resources,
although you can add [`actionReducers`](#actionreducers) to manage multiple
writes. In the future, redux-simple-resource may come with built-in write-many
action types and reducers (like `DELETE_BOOKS`).

### Resource Metadata

A resource typically has attributes associated with it. For instance, if your
application displays cats, then maybe each "cat" resource has a `name` and
`age` associated with it. This is the data for that resource.

In client side applications, it is frequently the case that there is a lot of
_other_ data associated with a particular resource, too. For instance, you may
want to track if the user has "selected" a particular cat in the UI, or if
they have made a request to delete a particular cat. This extra information is
"metadata."

In redux-simple-resource, metadata for each resource is stored in a separate
location in the store. There is also metadata associated with the entire _list_
of resources.

redux-simple-resource comes with some built-in metadata for every resource out
of the box. The metadata that it gives you are related to CRUD actions. If you
fire off a request to delete a resource, for instance, then
redux-simple-resource will take care of updating that resource's metadata with
[the status of that XHR request](#xhr-statuses).

And, of course, you can add in your own metadata, too.

#### Individual Resource Metadata

The built-in metadata for individual resources is stored in each store slice
as `resourceMeta`. This is an object, where each key is the ID of your object.

The built-in metadata for each resource is below:

```js
{
  // The status of any existing request to update the resource
  updatingStatus: xhrStatuses.NULL,
  // The status of any existing request to fetch the resource
  retrievingStatus: xhrStatuses.NULL,
  // The status of an any existing request to delete the resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource, and its metadata, from the store.
  deletingStatus: xhrStatuses.NULL
}
```

For instance, if we had two cats, and the first one had a request in flight to
delete it, then a piece of the store might look like:

```js
// store.cats
{
  resources: [
    {id: 1, name: 'sarah'},
    {id: 6, name: 'brian'},
  ]
  resourcesMeta: {
    1: {
      updatingStatus: xhrStatuses.NULL,
      // The request is in flight!
      retrievingStatus: xhrStatuses.PENDING,
      deletingStatus: xhrStatuses.NULL,
    },
    6: {
      updatingStatus: xhrStatuses.NULL,
      retrievingStatus: xhrStatuses.NULL,
      deletingStatus: xhrStatuses.NULL,
    }
  },
  ...otherThings
}
```

You are free to add custom metadata for every resource.

> Note: We do not recommend modifying the built-in meta values directly. Let
redux-simple-resource manage those for you.

#### Resource List Metadata

Sometimes, metadata needs to be associated with the entire list of resources.
For instance, in REST, to create a resource you must make a POST request to the
list of resources to. Following this pattern, the [XHR status](#xhr-statuses)
of create requests is stored in the list metadata in redux-simple-resource.

The default list metadata is:

```js
resourcesListMeta: {
  retrievingStatus: xhrStatuses.NULL,
  creatingStatus: xhrStatuses.NULL
}
```

You can also store your own custom metadata on the list. For instance, if a
user can select a series of items in a list, you may choose to keep an array
of selected IDs in the `resourcesListMeta`. Or, you might instead add a
`selected: true` boolean to each resource's individual meta. Both solutions
would work fine.

### XHR Statuses

HTTP requests go through a series of states, such as being in flight, or
succeeding, or being aborted. The metadata associated with each request reflects
each of these statuses.

This library stores five possible states for each XHR request in Redux. These
five states are available as a [named export from the module](#xhrstatuses).

The states are:

##### `PENDING`

The request has been sent, but a response has not yet been received. This state
is colloquially referred to as being "in flight."

##### `SUCCEEDED`

A success response was returned.

##### `FAILED`

An error response was returned.

##### `ABORTED`

The request was aborted by the client; a response will never be received.

##### `NULL`

This status is applied to a request that has not begun. For instance, when a
resource is first created, its read, update, and delete request statuses are
all `NULL`, because none of those requests have been made.

When requests have been made, there may also come a time when your application
no longer cares about the result of a request. At that time, you have the option
to set the XHR status to `NULL` by dispatching the `RESET` action type.

Not all applications will need to `RESET` requests. Many (if not most) of the
time, you will not need to manually reset the status back to `NULL`. But the
option is there if you need it.

### Action Types

redux-simple-resource creates CRUD-related action types for you.

The action types for read one, for instance, are:

```js
`READ_ONE_BOOK`
`READ_ONE_BOOK_FAIL`
`READ_ONE_BOOK_ABORT`
`READ_ONE_BOOK_SUCCEED`
`READ_ONE_BOOK_RESET`
```

These five types reflect the five [XHR Statuses](#xhr-statuses), as each of
these actions will update the XHR Status in the resource's metadata.

Actions that operate on a single resource **must** include an "id" attribute to
uniquely identify the resource being acted upon (although the name of the
attribute can be configured using the [`idAttribute` option](#idattribute)).

You can attach as many properties as you want to your action types, but the
following properties have special meaning in redux-simple-resource:

| Name | Used for | Description |
|------|----------|-------------|
| type | all      | The type of the action |
| id   | read one, delete, update, create | Uniquely identifies the resource. For more, see [idAttribute](#idattribute) |
| resource | read one, delete, update, create | The data for the resource |
| resources | read many | An array of resources being affected by this action |
| replace | read one, read many, update | Whether or not to replace existing data |

#### The "replace" property

All `SUCCEED` action types support a `replace` property, which is whether or
not the updated data should replace existing data in the store. `replace` is
`true` by default.

For single resources, passing `replace: false` will merge in the new data with
the existing data for that resource, if it exists. `replace: true` will

For multiple resources, `replace: false` will leave the existing list, but
merge in new resources with their existing versions, if they exist. New items
will be added at the end of the list. `replace: true` will completely remove the
existing list of resources, and their metadata, and replace it with the new
list.

#### "Start" action type

Each CRUD action has a start action type, which represents the start of a
request. This will update the metadata for this particular action to be in
an `xhrStatuses.PENDING` state.

These are the start action types:

```js
READ_ONE_{RESOURCE}
READ_MANY_{PLURAL_RESOURCE}
CREATE_{RESOURCE}
UPDATE_{RESOURCE}
DELETE_{RESOURCE}
```

An example start action type is:

```js
{
  type: READ_ONE_BOOK,
  id: 5
}
```

#### FAIL action type

This will update the metadata for this particular action to be in an
`xhrStatuses.FAILED` state.

These are the five FAIL action types:

```js
READ_ONE_{RESOURCE}_FAIL
READ_MANY_{PLURAL_RESOURCE}_FAIL
CREATE_{RESOURCE}_FAIL
UPDATE_{RESOURCE}_FAIL
DELETE_{RESOURCE}_FAIL
```

An example fail action type is:

```js
{
  type: READ_ONE_BOOK_FAIL,
  id: 5
}
```

#### ABORT action type

This will update the metadata for this particular action to be in an
`xhrStatuses.ABORTED` state.

```js
READ_ONE_{RESOURCE}_ABORT
READ_MANY_{PLURAL_RESOURCE}_ABORT
CREATE_{RESOURCE}_ABORT
UPDATE_{RESOURCE}_ABORT
DELETE_{RESOURCE}_ABORT
```

An example fail abort action type is:

```js
{
  type: READ_MANY_BOOKS_ABORT
}
```

#### SUCCEED action type

This will update the metadata for this particular action to be in an
`xhrStatuses.SUCCEED` state. It will also update the resources themselves in
your store.

For reads and updates, the data that you pass in will replace existing data in
the store unless you include `replace: false` in your action.

Example success actions are:

```js
{
  type: 'UPDATE_ONE_BOOK_SUCCESS',
  id: 10,
  resource: {
    id: 10,
    name: 'Twilight',
    pages: 325
  }
}
```

```js
{
  type: 'READ_MANY_BOOKS_SUCCESS',
  resources: [
    {id: 2, name: 'Moby Dick'},
    {id: 10, name: 'Twilight'},
  ],
  replace: false
}
```

```js
{
  type: 'DELETE_ONE_BOOK_SUCCESS',
  id: 10
}
```

#### RESET action type

This action type is intended to be used to update a particular XHR status
from a non-`NULL` value back to `NULL`. For instance, consider if a request
fails, and you use the metadata in the store to conditionally render an alert
to the user. If the user dismisses the alert, then you may wish to fire a
`RESET` action type to reset the state back to `NULL`, which would cause the
alert to disappear.

An example reset action is:

```js
{
  type: 'DELETE_ONE_BOOK_RESET',
  id: 10
}
```

#### Example Action Creator

This is an example action creator to update a cat resource. It is an [action
creator thunk](https://github.com/gaearon/redux-thunk).

It uses the [`xhr` module](https://github.com/naugtur/xhr) for making the
request, although you can use any system that you want.

```js
import xhr from 'xhr';
import cat from './cat-resource';

function updateCat(id, data) {
  return dispatch => {
    dispatch({
      type: cat.actionTypes.UPDATE_CAT,
      id
    });

    const req = xhr.patch(
      `/api/v1/cat/${id}`,
      {json: data},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: cat.actionTypes.UPDATE_CAT_ABORT,
            id,
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: cat.actionTypes.UPDATE_CAT_FAIL,
            id,
          });
        } else {
          dispatch({
            type: cat.actionTypes.UPDATE_CAT_SUCCEED,
            category: body,
            id
          });
        }
      }
    );

    return req;
  };
}
```

This action type supports the full range of features in redux-simple-resource.
Because it returns the XHR, the user can abort the request. For instance, in
your component, you may have:

```js
componentWillMount() {
  this.updateXhr = this.props.updateCat(2, {name: 'Felix'});
}

componentWillUnmount() {
  if (this.updateXhr) {
    this.updateXhr.abort();
  }
}
```

### Shallow Cloning

redux-simple-resource makes updates to the store via shallow cloning. This
system works well if you make it a habit to never modify data from your store.

There are tools like Immutable to strongly enforce this, but you can also work
on teams on large products and not use Immutable.

If you absolutely need deep cloning, or Immutable support, rather than shallow
cloning, then know that there are plans to add a hook to replace the shallow
cloning with a custom cloning function. If this interests you, then follow along
on [this issue](https://github.com/jmeas/redux-simple-resource/issues/11).

### What is a simple resource?

The notion of "simple" refers to APIs that do not have a specification for
compound documents. Compound documents are documents that contain primary
resources, as well as resources that they have relationships with (one-to-one,
many-to-one, etc.).

For instance, consider fetching a "cat" resource. If you also wish to fetch
the cat's "owner" and its "location" in one request, what does the response look
like? Your API may not support this at all. Or it may merge all of the
attributes from all of these objects together, requiring the client to pick them
apart. In both of those situations, the resource is what I am calling "simple."

On the other hand, your API may return these other resources in a "related"
key, which has a list of other resources, as well as their type. This formal
support for relationships enables you to build abstractions around them.

In summary, your API returns simple resources if:

- it does _not_ support returning compound documents at all. Every request is
  always against a single resource, and not the other resources it has
  relationships with.
- it _does_ support returning compound documents, but it is done in an ad hoc
  way. In other words, there is no specification or format that applies to
  every resource, and every relationship.

Building APIs that support relationships in a consistent way is more difficult,
and therefore, most APIs return simple resources.

An example of a system that _does_ provide a formal relationship definition is
[JSON API]((http://jsonapi.org/)).

#### What if my API supports more than "simple" resources?

If you're using a system like JSON API, where relationships are formally
defined by the API, then you still can use redux-simple-resource.

Just be aware that redux-simple-resource will treat every response, even ones
containing compound documents, as a single resource.

You have two options to deal with this:

1. build an abstraction on top of redux-simple-resource to manage relationships
2. use a different, JSON API-specific Redux framework
