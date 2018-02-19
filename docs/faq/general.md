# General FAQ

#### When should I use Redux Resource?

If you feel that you're writing too much boilerplate when using Redux by itself,
then it might be worth giving a library like Redux Resource a try. There are
[similar projects](/docs/introduction/similar-projects.md) that also aim to
reduce Redux boilerplate, which are also worth your consideration.

#### Does this only work with React?

No. The only requirement is that you are using Redux, or a library that has a
similar API to Redux.

#### How does this library handle immutable state?

This library uses shallow cloning for state tree updates. This has worked well
for us, even on medium-to-large sized applications.

Redux Resource does not work well with libraries like
[Immutable.js](https://facebook.github.io/immutable-js/), although we're open
to adding support for Immutable if it doesn't bloat the library too much. If
this is something you're interested in,
[open an issue](https://github.com/jamesplease/redux-resource/issues/new) and we
can talk more about it.

#### Does this only work with APIs that return data in a specific format?

No, this library is agnostic to the format that you receive data in. The only
requirement is that each resource that you pass into this library has an `id`
attribute.

We understand that not every system stores its resources with an `id` attribute.
For instance, if you're working with a books resource, then it might instead
have an id attribute called `bookId`. In these situations, you will need to
write a transform that maps that key to be `id` instead.

For more, refer to [the Resources guide](/docs/guides/resources.md).

#### Does this work with a backend that adheres to a well-defined format, such as JSON API?

Yes, it does. You may want to write a [plugin](../guides/plugins.md) to handle
some advanced features provided by specifications such as JSON API, such as rich
relationship support.

#### Does this work with backends that are not strictly "RESTful"?

Yes. The only requirement is that the data returned can be reasonably mapped to
the concept of a "resource." A resource, from this library's perspective, is
a JavaScript object with an `id` attribute.

For more on this, refer to [the Resources guide](/docs/guides/resources.md).

#### Does Redux Resource handle forms, or client-side changes to data?

This library complements, but does not replace, solutions for managing forms
and other ways to manipulate resource data on the client. Redux Resource
works will with any system for managing forms, such as local Component state,
[react-redux-form](https://github.com/davidkpiano/react-redux-form),
or [redux-form](https://github.com/erikras/redux-form).

#### Why does `getStatus` take the entire state as the first argument, while `getResources` takes a slice?

`getResources` always returns one subset of resources of a single type, so it wouldn't make sense to pass
the entire state as the first argument. When aggregating request statuses, you may need to aggregate across
multiple slices, so it's a requirement that `getStatus` support that.

In older versions of Redux Resource, `getResources` accepted `state` as the first argument. The problem
with this approach is that it really only worked well when you were using `combineReducers`. Although we
believe that most people are likely using `combineReducers`, we didn't want that to be a hard requirement
for using Redux Resource.
