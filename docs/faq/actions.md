# Actions

#### Are there Action Creators?

Not in the core library, but there is an
[HTTP Action Creators library](/docs/extras/redux-resource-xhr.md).

Developers have different preferences when it comes to making requests, so
we made this library easy to use with any library that you choose. We've
had great success with the library linked to above, but should you choose to
write your own, we have guides to help you.

Refer to the [CRUD Actions](/docs/guides/crud-actions.md) guide to learn more
about how to build your own action creator, or the four CRUD guides for examples
of action creators:

- [Reading resources](/docs/guides/reading-resources.md)
- [Updating resources](/docs/guides/reading-resources.md)
- [Creating resources](/docs/guides/reading-resources.md)
- [Deleting resources](/docs/guides/reading-resources.md)

#### Does Redux Resource require you to use a specific tool for making HTTP requests?

No, you can use any system for making requests that you'd like. We do strongly encourage
you to use a library that supports [cancellation](/docs/recipes/canceling-requests).

#### Should all Actions include a named request?

Probably not. We recommend only using named requests when they provide you value. The
two most common use cases for named requests are:

1. creating resources

2. multiple bulk reads of the same resource type on the same page

If you're not doing either of those things, then you might not need to name the request,
and that's fine.

A handy rule of thumb for when to use named requests, as well as much more
information about named requests, can be found in
[the Named Requests guide](/docs/guides/named-requests.md#when-to-use-named-requests).

#### When is setting the `mergeMeta` action attribute to `false` useful?

At the moment, we don't know of any use case for doing this. We included this attribute
in the event that you find one – we're sure there's one out there!
