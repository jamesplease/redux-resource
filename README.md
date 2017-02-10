# redux-simple-resource

A powerful Redux system for interacting with remote resources.

[![Travis build status](http://img.shields.io/travis/jmeas/redux-simple-resource.svg?style=flat)](https://travis-ci.org/jmeas/redux-simple-resource)

### Motivation

A common criticism of Redux is that it requires writing a lot of boilerplate.
Numerous projects exist to reduce that boilerplate, particularly around
resources that are fetched asynchronously. This project fits into that category.

#### Why this project?

There are several unique goals and features of this library that might make it
stand out against the competition. Its features include:

✓ Default reducers, action creators, and action types created for you  
✓ [Unopinionated technology decisions](#opinionated-decisions)  
✓ All features are opt-out: pick and choose what works for you  
✓ Per-resource approach to configuration  
✓ Supports aborting XHR requests  
✓ Supports metadata for resources and resource lists  
✓ Works great with consistent and inconsistent backends  

### Getting started

Install this library through npm.

`npm i redux-simple-resource`

Create a simple resource.

```js
import simpleResource from 'redux-simple-resource';

// Create a simple resource. Options are documented below.
const books = simpleResource('book', options);

// Attach its reducers
const reducers = combineReducers({
  books.reducers
});

// Launch a request to create a book
books.actionCreators.create(bookData);
```

### Opinionated decisions

Although every feature of `redux-simple-resource` is opt out, there are a few
decisions that disagreeing with would (currently) require rewriting a lot of
code (which goes against the point of using a tool like this). They are:

- The use of [`xhr`](https://github.com/naugtur/xhr) for HTTP requests.
- The use of shallow cloning for pseudo-immutability.

#### Using `xhr`

This decision fits into the goals of keeping this library simple and
unopinionated. XHR is nice because it is a small wrapper around native the
native XMLHttpRequest API; it's as low-level as you can get without using
the native API.

Because all of the action creators can be overridden, you are free to use any
tool you want. In the future, there may be a hook to replace XHR without needing
to rewrite the whole action creator. If this interests you, then follow along on
[this issue](https://github.com/jmeas/redux-simple-resource/issues/12).

#### Shallow cloning

This continues along the lines of keeping the library simple and unopinionated.
Shallow cloning works great if you follow two guidelines:

1. keep your store data simple and shallow
2. never modify data from the store

I've worked on large projects that follow these patterns, and it's worked great.
Some of these projects also tried out Immutable, yet later removed it because
it didn't seem to add much value, yet did add an API learning curve.

If you are a strong believer in Immutable.js, then this library is probably
not for you.

If you need deep cloning, then know that there are plans to add a hook to
replace the shallow cloning with a custom cloning function. If this interests
you, then follow along on
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
