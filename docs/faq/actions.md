# Actions

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

#### Does Resourceful Redux require you to use a specific tool for making HTTP requests?

No, you can use any system for making requests that you'd like.

#### Should all Actions have labels?

Probably not.  We recommend using labels when they provide you value. Two common
use cases for labels are:

1. creating resources

2. multiple bulk reads of the same resource type on the same page

A handy rule of thumb for when to use labels, as well as much more information
about labels, can be found in
[the Labels guide](/docs/guides/labels.md#when-to-use-labels).
