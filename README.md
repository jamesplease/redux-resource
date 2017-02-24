# redux-simple-resource

A powerful Redux system for interacting with remote resources.

[![Travis build status](http://img.shields.io/travis/jmeas/redux-simple-resource.svg?style=flat)](https://travis-ci.org/jmeas/redux-simple-resource)
[![Test Coverage](https://codeclimate.com/github/jmeas/redux-simple-resource/badges/coverage.svg)](https://codeclimate.com/github/jmeas/redux-simple-resource)

### Table of Contents

- [Motivation](#motivation)
  - [Why This Project?](#why-this-project)
- [Getting Started](#getting-started)
- [API](#api)
  - [createResource](#createresource-resourcename-options-)
  - [xhrStatuses](#xhrstatuses)
- [Guides](#guides)
  - [XHR Statuses](#xhr-statuses)
  - [Shallow Cloning](#shallow-cloning)
  - [What is a "simple" resource?](#what-is-a-simple-resource)

### Motivation

Use this project to reduce Redux boilerplate for CRUD'ing remote resources.

✓ Default reducers, action types, and initial state created for you  
✓ All features are opt-out: pick and choose what works for you  
✓ Stores "metadata" for resources and resource lists  
✓ Works great with consistent and inconsistent backends  
✓ [Unopinionated technology decisions](#unopinionated-decisions)  

#### Why this project?

There are numerous projects with the same goal as this library. In general,
this library provides you with more features out-of-the-box than other
solutions, yet remains just as customizable with its "everything-is-opt-out"
approach.

A more in-depth comparison between this library and alternatives is coming soon.

### Getting started

Install this library through [npm ⇗](https://www.npmjs.com).

`npm install redux-simple-resource`

Then, import it and create a resource.

```js
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createResource from 'redux-simple-resource';

// The options are optional, and are documented in the "API" section of this
// README.
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

#### `createResource( resourceName, [options] )`

This is the default export of this library. Pass `resourceName`, a string. Be
sure to pass a singular version of your resource as the name. For instance, if
this resource is for "books", then `resourceName` should be "book".

This method returns an object with the following properties:

| Name | Description |
|------|-------------|
|reducer | A reducer that manages CRUD'ing the resource |
|pluralForm | The pluralized name of `resourceName` |
|actionTypes | The CRUD action types to be used in user-defined action creators |
|initialState | The initial state returned by reducer |

The optional `options` Object can be used to customize all of the default
behavior. All options are optional. Read about the different options below:

##### `pluralForm`

Pass the pluralized version of your resource's name. By default, an "s" is
appended to your resource's name.

```js
const person = createResource('person', {
  pluralForm: 'people'
});
```

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
and reducer handlers from being created.

Keep in mind that you may not choose to ever use this option, even if your
resource only supports a subset of CRUD. You could simply choose to not use the
other generated action types, and there would be no issues with you doing
that. It's up to you.

```js
// In this application, the cat resource can only be fetched as a list.
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
rename it to ID, or use this value to update what redux-simple-resource
will look for.

```js
const movie = createResource('movie', {
  idAttribute: 'movieId'
});
```

##### `initialState`

Add additional initial state to the default initial state. The default initial
state is:

```js
{
  // These are the actual resources that the server sends back.
  resources: [],
  // This is metadata about _specific_ resources. For instance, if a DELETE
  // is in flight for a book with ID 24, then you could find that here.
  resourcesMeta: {},
  // This is metadata about the entire collection of resources. For instance,
  // on page load, you might fetch all of the resources. The XHR status for
  // that request would live here.
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
    peopleAreHungry: true
  }
});
```

##### `customHandlers`

Your reducer will likely need to do more than handle CRUD operations. You can
add in custom "handlers" for action types with this option.

Pass an Object, where the keys are the action type you wish to register a
handler for, and the value is the function that gets called.

The function will be called with two arguments: `state, action`, just like
a reducer. You must return the new state.

```js
const pet = createResource('pet', {
  customHandlers: {
    SELECT_PET(state, action) {
      // Modify the state as you wish...
      var newState = generateNewState(state);
      // Then return it.
      return newState;
    }
  }
})
```

#### `xhrStatuses`

This is a named export from this library. It is an Object that represents
the different states that an XHR request can be in.

You will usually use this to determine the state of XHR requests for your
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

### XHR Statuses

HTTP requests go through a series of states, such as being in flight, or
succeeding, or being aborted. This library stores this data for all requests
that are made to your resources.

"XHR Statuses" refers to the strings that are stored in Redux to represent
these different states.

This library stores five possible states for each XHR request in Redux. These
five states are available as a [named export from the module](#xhrstatuses).

The states are:

##### `PENDING`

The request has been sent, but a response has not yet been received.

##### `SUCCEEDED`

A success response was returned. By default, successes are determined by status
codes that are <= 400.

##### `FAILED`

An error response was returned. By default, errors are determined by status
codes that are > 400.

##### `ABORTED`

The request was aborted by the client. A response will never be returned.

##### `NULL`

This status is applied to a request that has not begun. There may also come a
time when your application no longer cares about the result of a request. At
that time, you have the option to set the XHR status to `NULL`.

### Shallow cloning

redux-simple-resource makes updates to the store via shallow cloning. This
system works well if you:

1. keep your store data shallow (in other words, avoid deeply nested objects)
2. never modify data from the store

I've worked on large projects that follow these patterns, and it's worked great.

If you absolutely need deep cloning, rather than shallow cloning, then know that
there are plans to add a hook to replace the shallow cloning with a custom
cloning function. If this interests you, then follow along on
[this issue](https://github.com/jmeas/redux-simple-resource/issues/11).

### What is a simple resource?

By "simple," I mean resources that do not have a formal definition of a
relationship with one another. In redux-simple-resource, the notion of a
compound document (a response containing more than one resource) isn't built in,
although you could add that in yourself.

Most APIs do not have formal definitions of relationships, and therefore do not
have the concept of a compound document that could be used in a systematic way.

An example of a system that _does_ provide a formal relationship definition is
[JSON API]((http://jsonapi.org/)). If your endpoints adhere to JSON API, then
you still could use simple-resource, but you could also use a system that gets
you more by building in support for compound documents automatically.

For most APIs, redux-simple-resource should be a perfect fit.
