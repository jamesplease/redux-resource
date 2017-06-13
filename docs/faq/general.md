# General FAQ

#### When should I use resourceful-redux?

If you've using vanilla Redux for managing resources, but feel that you're
writing too much boilerplate, then it might be worth giving a library like
resourceful-redux a try. There are
[similar projects](/docs/introduction/similar-projects.md) that are worth
considering, too.

#### Where are the action creators?

They're coming soon. We thought that the primary value add of resourceful-redux
comes from its reducers, so we shipped those first.

#### Does this only work with React?

No. The only requirement is that you are using Redux, or a library that has a
similar API to Redux.

#### Does this work with a backend that adheres to a strict format, such as JSON API?

Yes, it does. You may want to write a plugin to handle some advanced features
provided by specifications such as JSON API, such as rich relationship support.

#### Does this work with backends that are not strictly "RESTful"?

Yes. In fact, this is the use case that this library was built for. The only
requirement is that the data returned can be reasonably mapped to the concept of
a resource.
