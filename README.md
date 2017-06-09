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
  - [createResource()](#createresource-resourcename-options-)
  - [requestStatuses](#xhrstatuses)
  - [updateResourceMeta()](#updateresourcemeta-resourcemeta-newmeta-id-replace-)
  - [updateManyResourceMetas()](#updatemanyresourcemetas-resourcemeta-newmeta-ids-replace-)
  - [upsertResource()](#upsertresource-resources-resource-id-idattribute-replace-)
  - [upsertManyResources()](#upsertmanyresources-resources-newresources-idattribute-replace-)
- [Guides](#guides)
  - [Resource Names](#resource-names)
  - [Resource Metadata](#resource-metadata)
  - [XHR Statuses](#xhr-statuses)
  - [Action Types](#action-types)
  - [Structure of the Store](#structure-of-the-store)
  - [Customizing the Default Reducers](#customizing-the-default-reducers)
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
✓ Zero dependencies  

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

The default export of this library is `createResource`. There are several
named exports, which are utilities that may help you when working with
redux-simple-resource.

### `createResource( resourceName, [options] )`

This is the default export of this library. Be sure to pass a singular version
of your resource as `resourceName`. For instance, if this resource is for
"books", then `resourceName` should be "book".

For multi-word resource names, use camel case. For instance, "cat person" should
be input as "catPerson".

The `resourceName` is used to generate action types. For more, read
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

- `create`
- `read`
- `update`
- `delete`
- `createMany`
- `readMany`
- `updateMany`
- `deleteMany`

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
    read: false,
    del: false,
    update: false,
    create: false,
    readMany: true,
    delMany: false,
    updateMany: false,
    createMany: false,
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
  meta: {},
  // This is metadata about the entire collection of resources. For instance,
  // on page load, you might fetch all of the resources. The XHR status for
  // that request would live here.
  // For more, see the Resource Meta guide in this README.
  : {
    readStatus: requestStatuses.NULL,
    createStatus: requestStatuses.NULL,
    createManyStatus: requestStatuses.NULL
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
      actionType: 'SELECT_PET',
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

### `requestStatuses`

This is a named export from this library. It is an Object that represents
the different states that an XHR request can be in.

```js
// requestStatuses
{
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  NULL: 'NULL'
}
```

For an explanation of what each of these means, refer to
[the XHR Statuses guide](#xhr-statuses).

You will usually use this object to determine the state of XHR requests for your
resources. Let's see what this might look like:

```js
import React, {Component} from 'react';
import {requestStatuses} from 'redux-simple-resource';

// Within a component's render, you may use it to conditionally render some JSX.
class MyComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // This is a value that is pulled from the store, and automatically kept
    // up-to-date for you. For more, see the Guides section below.
    const {listMeta} = this.props;

    // Render loading text if a retrieve request is in flight
    if (listMeta.readStatus === requestStatuses.PENDING) {
      return (<div>Loading data</div>);
    } else {
      return (<div>Not loading data</div>);
    }
  }
}
```

### `updateResourceMeta({ meta, newMeta, id, replace })`

Use this method to update the metadata for a single resource. `meta`
is **all** of the existing meta, `newMeta` is the new meta to assign to
the resource, and `id` is the ID of the resource that you are updating.

This does not directly modify the `meta` object; instead, it returns
a shallow clone.

| Name | Required | Description |
|------|-------------|----------|
|meta | Yes | The current meta object for **all** resources |
|newMeta | Yes | The new metadata |
|id | Yes | The ID of the resource to update |
|replace | No | Whether or not to replace any existing meta for this resource. Defaults to `false` |

### `updateManyResourceMetas({ meta, newMeta, ids, replace })`

Similar to `updateResourceMeta`, but this enables you to update a list of `ids`
with the same `newMeta`. `meta` is **all** of the existing meta.

If `replace: true` is passed, then the existing meta is discarded, and what you
pass in will be all of the meta in the store.

Pass `replace: false` to keep all existing meta, and to merge in `newMeta` with
any existing metadata for each resource. (default behavior)

This method does not enable you to update multiple IDs with different metadata.

| Name | Required | Description |
|------|-------------|----------|
|meta | Yes | The current meta object for **all** resources. |
|newMeta | Yes | The new metadata |
|ids | Yes | An array of IDs to update |
|replace | No | Whether or not to replace the current list, or to merge in the new data. Defaults to `false` |

### `upsertResource({ resources, resource, id, idAttribute, replace })`

Insert or update a resource to the list of resources.

| Name | Required | Description |
|------|-------------|----------|
|resources | Yes | The current list of resources from the store |
|resource | Yes | The new resource to add |
|id | Yes | The id value of the new resource |
|idAttribute | No | The id key of the new resource. Defaults to `"id"` |
|replace | No | Whether or not to replace the resource (if it already exists). Defaults to `false` |

### `upsertManyResources({ resources, newResources, idAttribute, replace })`

Insert or update a list of resources to the list of resources.

| Name | Required | Description |
|------|-------------|----------|
|resources | Yes | The current list of resources from the store |
|newResources | Yes | The new resources to add |
|idAttribute | No | The id key of the new resources. Defaults to `"id"` |
|replace | No | Whether or not to replace the existing resource list, or to merge new with old. Defaults to `false` |

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
// These operate on many resources
`READ_MANY_BOOKS`
`DELETE_MANY_BOOKS`
`UPDATE_MANY_BOOKS`
`CREATE_MANY_BOOKS`

// These operate on a single resource
`READ_BOOK`
`DELETE_BOOK`
`UPDATE_BOOK`
`CREATE_BOOK`
```

redux-simple-resource will snake case any camel case name that you pass in.
For instance, here's the read one action type for different resource names:

| `resourceName` | read one action type |
|----------------|----------------------|
| cat            | READ_CAT             |
| catperson      | READ_CATPERSON       |
| catPerson      | READ_CAT_PERSON      |

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

You can use this built-in metadata to easily show loading spinners, error
messages, success messages, and other UI features that conditionally appear
based on the status of XHR requests against a resource.

And, of course, you can add in your own metadata, too.

#### Individual Resource Metadata

The built-in metadata for individual resources is stored in each store slice
as `meta`. This is an object, where each key is the ID of your object.

The built-in metadata for each resource is below:

```js
{
  // The status of any existing request to update the resource
  updateStatus: requestStatuses.NULL,
  // The status of any existing request to fetch the resource
  readStatus: requestStatuses.NULL,
  // The status of an any existing request to delete the resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource, and its metadata, from the store.
  deleteStatus: requestStatuses.NULL
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
  meta: {
    1: {
      updateStatus: requestStatuses.NULL,
      // The request is in flight!
      readStatus: requestStatuses.PENDING,
      deleteStatus: requestStatuses.NULL,
    },
    6: {
      updateStatus: requestStatuses.NULL,
      readStatus: requestStatuses.NULL,
      deleteStatus: requestStatuses.NULL,
    }
  },
  ...otherThings
}
```

You are free to add custom metadata for every resource.

> Note: We do not recommend modifying the built-in meta values directly. Let
redux-simple-resource's reducers manage those for you.

#### Resource List Metadata

Sometimes, metadata needs to be associated with the entire list of resources.
For instance, in REST, to create a resource you must make a POST request to the
list of resources to. Following this pattern, the [XHR status](#xhr-statuses)
of create requests is stored in the list metadata in redux-simple-resource.

The default list metadata is:

```js
listMeta: {
  readStatus: requestStatuses.NULL,
  createStatus: requestStatuses.NULL,
  createManyStatus: requestStatuses.NULL
}
```

You can also store your own custom metadata on the list. For instance, if a
user can select a series of items in a list, you may choose to keep an array
of selected IDs in the `listMeta`. Or, you might instead add a
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

##### `NULL`

This status is applied to a request that has not begun, or to reset a request
that you do not care about. For instance, when a resource is first created, its
read, update, and delete request statuses are all `NULL`, because none of those
requests have been made.

When requests have been made, there may also come a time when your application
no longer cares about the result of a request. At that time, you have the option
to set the XHR status to `NULL` by dispatching the `RESET` action type.

Two common use cases for the `NULL` are:

1. aborting a request
2. dismissing an alert that appears whenever a status is `SUCCEEDED` or `FAILED`

If you do not need to use the `NULL` status, then that is fine. There are many
situations where you do not need to reset the status of a request.

### Action Types

redux-simple-resource creates CRUD-related action types for you.

The action types for read one, for instance, are:

```js
`READ_BOOK`
`READ_BOOK_FAIL`
`READ_BOOK_ABORT`
`READ_BOOK_SUCCEED`
`READ_BOOK_RESET`
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
| id   | read, delete, update, create | Uniquely identifies the resource. For more, see [idAttribute](#idattribute) |
| ids  | delete many | Uniquely identifies the resource. For more, see [idAttribute](#idattribute) |
| resource | read, update, create | The data for the resource |
| resources | read many, update many, create many | An array of resources being affected by this action |
| replace | read, read many, update, update many | Whether or not to replace existing data |

#### The "replace" property

All `SUCCEED` action types support a `replace` property, which is whether or
not the updated data should replace existing data in the store. `replace` is
`true` by default, except for bulk updates (this inconsistency will be resolved
in v2.0. For more, see #106).

For single resources, passing `replace: false` will merge in the new data with
the existing data for that resource, if it exists. `replace: true` will replace
the old data with the new.

For multiple resources, `replace: false` will leave the existing list, but
merge in new resources with their existing versions, if they exist. New items
will be added at the end of the list. `replace: true` will completely remove the
existing list of resources, and their metadata, and replace it with the new
list.

Given the above description, it might make sense why update many has `replace`
set to `false` by default. You normally don't want to throw out the rest of the
list of resources when you do a bulk update on a subset of that list.

#### "Start" action type

Each CRUD action has a start action type, which represents the start of a
request. This will update the metadata for this particular action to be in
an `requestStatuses.PENDING` state.

These are the start action types:

```js
`READ_{RESOURCE}`
`CREATE_{RESOURCE}`
`UPDATE_{RESOURCE}`
`DELETE_{RESOURCE}`

`READ_MANY_{PLURAL_RESOURCE}`
`CREATE_MANY_{PLURAL_RESOURCE}`
`UPDATE_MANY_{PLURAL_RESOURCE}`
`DELETE_MANY_{PLURAL_RESOURCE}`
```

An example start action type is:

```js
{
  type: READ_BOOK,
  id: 5
}
```

#### FAIL action type

This will update the metadata for the affected resources to be in an
`requestStatuses.FAILED` state.

These are the five FAIL action types:

```js
`READ_{RESOURCE}_FAIL`
`CREATE_{RESOURCE}_FAIL`
`UPDATE_{RESOURCE}_FAIL`
`DELETE_{RESOURCE}_FAIL`

`READ_MANY_{PLURAL_RESOURCE}_FAIL`
`CREATE_MANY_{PLURAL_RESOURCE}_FAIL`
`UPDATE_MANY_{PLURAL_RESOURCE}_FAIL`
`DELETE_MANY_{PLURAL_RESOURCE}_FAIL`
```

An example fail action type is:

```js
{
  type: READ_BOOK_FAIL,
  id: 5
}
```

#### ABORT action type

This will update the metadata for the affected resources to be in an
`requestStatuses.NULL` state.

```js
`READ_{RESOURCE}_ABORT`
`CREATE_{RESOURCE}_ABORT`
`UPDATE_{RESOURCE}_ABORT`
`DELETE_{RESOURCE}_ABORT`

`READ_MANY_{PLURAL_RESOURCE}_ABORT`
`CREATE_MANY_{PLURAL_RESOURCE}_ABORT`
`UPDATE_MANY_{PLURAL_RESOURCE}_ABORT`
`DELETE_MANY_{PLURAL_RESOURCE}_ABORT`
```

An example fail abort action type is:

```js
{
  type: READ_MANY_BOOKS_ABORT
}
```

#### SUCCEED action type

This will update the metadata for the affected resources to be in an
`requestStatuses.SUCCEED` state. It will also update the resources themselves in
your store.

For reads and writes, the data that you pass in will replace existing data in
the store unless you include `replace: false` in your action.

> Note: Bulk updates are an exception: they have `replace: false` as the
  default.

Example success actions are:

```js
{
  type: 'UPDATE_BOOK_SUCCESS',
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
  type: 'DELETE_BOOK_SUCCESS',
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

Also, if you abort a request, then you may also choose to fire this action type.

An example reset action is:

```js
{
  type: 'DELETE_BOOK_RESET',
  id: 10
}
```

#### Custom Action Types

Custom action types are also supported by this library. For an explanation,
and an example, refer to
[the API docs](https://github.com/jmeas/redux-simple-resource#actionreducers).

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
            resource: body,
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

### Structure of the Store

redux-simple-resource creates the overall structure of the store for resources.
The default initial state that is created for you represents this overall
structure:

```js
{
  // These are the actual resources that the server sends back.
  resources: [],
  // This is metadata about _specific_ resources. For instance, if a DELETE
  // is in flight for a book with ID 24, then you could find that here.
  // For more, see the Resource Meta guide in this README.
  meta: {},
  // This is metadata about the entire collection of resources. For instance,
  // on page load, you might fetch all of the resources. The XHR status for
  // that request would live here.
  // For more, see the Resource Meta guide in this README.
  listMeta: {
    readStatus: requestStatuses.NULL,
    createStatus: requestStatuses.NULL,
    createManyStatuses: requestStatuses.NULL
  }
}
```

For instance, if you're building a component that interacts with a particular
book resource, then you may use the following `mapStateToProps`:

```js
mapStateToProps(state, props) {
  // Grab our book
  const book = _.find(state.books.resources, {id: props.bookId});
  // Grab its metadata
  const bookMeta = state.meta[props.bookId];

  // Pass that into the component
  return {
    book,
    bookMeta
  };
}
```

### Customizing the Default Reducers

Sometimes, the default reducers may not do exactly what you want. Maybe you
want to handle a particular action in a different way. Or perhaps you want to
add more metadata with a different type.

If the way a particular action type is reduced is not what you want, then you
do not need to dispatch an action with that action type.

If you wish to add additional data to the store after a particular action, then
we recommend that you fire a separate, custom action immediately after the
default one. For instance,

```js
// Dispatch the default action
dispatch({type: 'READ_BOOK_SUCCESS', id: 5});
// Dispatch your default action
dispatch({type: 'READ_BOOK_SUCCESS_EXTRA_THINGS', id: 5});
```

If you're worried about performance, give it a try. If you can demonstrate that
this pattern causes performance issues, then we will consider alternative
solutions.

tl;dr: we do not recommend attempting to modify the built-in reducers. Either
don't dispatch those action types, or dispatch separate actions with custom
types before or after the built-in types.

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

Relationship support is on the way. See #96 for more information.
