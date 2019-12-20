# Actions

#### Are there Action Creators?

Not in the core library.

When it comes to making requests, there is an
[HTTP Action Creators library](../extras/redux-resource-xhr.md).

Developers have different preferences when it comes to making requests, so
we made this library easy to use with any library that you choose. We've
had great success with the library linked to above, but should you choose to
write your own, we have guides to help you.

Refer to the [Request Actions](../requests/request-actions.md) guide to learn more
about how to build your own action creator, or the four CRUD guides for examples
of action creators:

- [Reading resources](../requests/reading-resources.md)
- [Updating resources](../requests/reading-resources.md)
- [Creating resources](../requests/reading-resources.md)
- [Deleting resources](../requests/reading-resources.md)

#### Does Redux Resource require you to use a specific tool for making HTTP requests?

No, you can use any system for making requests that you'd like. We do strongly encourage
you to use a library that supports [cancellation](../recipes/canceling-requests.md).

#### Should all Actions include a request key?

If you're manually coming up with the request keys, then it is typically extra boilerplate
to _always_ use them. In those situations, we recommend only using request keys
when they provide you value.

Because request keys are used to make request objects within the store, anytime that you need a
request object is when you should use a request key. The two most common use cases for request
objects are:

1. creating resources

2. multiple bulk reads of the same resource type on the same page

If you're not doing either of those things, then you might not need to name the request,
and that's fine.

A handy rule of thumb for when to use request objects, as well as much more
information about requests, can be found in
[Request Keys and Names guide](../requests/keys-and-names.md#when-to-use-request-keys).

#### When is setting the `mergeMeta` action attribute to `false` useful?

At the moment, we don't know of any use case for doing this. We included this attribute
in the event that you find one – we're sure there's one out there!
