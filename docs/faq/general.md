# General FAQ

#### When should I use Resourceful Redux?

If you feel that you're writing too much boilerplate when using Redux by itself,
then it might be worth giving a library like Resourceful Redux a try. There are
[similar projects](/docs/introduction/similar-projects.md) that also aim to
reduce Redux boilerplate, which are also worth your consideration.

#### Are there Action Creators?

Not in the core library, but there is an
[Action Creators extension](/docs/extensions/action-creators.md).

Developers have different preferences when it comes to making requests, so we
made this library easy to use with any request library that you choose. We've
had great success with the Action Creator extension, but should you choose to
write your own, we have guides to help you.

Refer to the [CRUD Actions](/docs/guides/crud-actions.md) guide to learn more
about how to build your own action creator, or the four CRUD guides for examples
of action creators:

- [Reading resources](/docs/guides/reading-resources.md)
- [Updating resources](/docs/guides/reading-resources.md)
- [Creating resources](/docs/guides/reading-resources.md)
- [Deleting resources](/docs/guides/reading-resources.md)

#### Does this only work with React?

No. The only requirement is that you are using Redux, or a library that has a
similar API to Redux.

#### How does this library handle immutable state?

This library uses shallow cloning for state tree updates. This has worked well
for us, even on medium-to-large sized applications.

Resourceful Redux does not work well with libraries like
[Immutable.js](https://facebook.github.io/immutable-js/), although we're open
to adding support for Immutable if it doesn't bloat the library too much. If
this is something you're interested in,
[open an issue](https://github.com/jmeas/resourceful-redux/issues/new) and we
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
