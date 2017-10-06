# Caching

Caching server responses can improve the responsiveness of your application. 

Redux Resource does not currently provide an official plugin for caching. This recipe contains
tips that could help you if you're interested in writing your own caching system.

> Keep in mind that caching is an optimization, and optimizations
  frequently require more code and more complexity. If your application's endpoints are fast
  enough, you might not see a noticeable improvement by introducing caching.

### Caching Using Named Requests or Lists

We recommend using either [lists](/docs/guides/lists.md) or
[named requests](/docs/guides/named-requests.md) for caching.

### Caching Requests Using Names

A caching system using named requests might work like this:

1. Keep a store of cached responses from the server in memory, keyed off by the request name.
2. Anytime the UI calls an action creator with a particular request label, the action creator checks
  the cache. If that request exists in the cache, then you return the cached result.
3. Introduce new action properties, such as `skipCache`, to provide programmatic control over skipping
  the cache when a request is made.
4. Provide a new action creator that lets developers programmatically wipe the cache.

This system is untested, but we believe it would work well for many applications.

### Caching Requests Using Lists

If you have many requests contributing to a single list, then you may need to cache at the
list level. For instance, if the user can read their favorite books, and then create new
favorite books. The new "list" of books that needs to be cached includes the results of
these two requests. A similar to the system above should also work for lists. Just use the
list name rather than the request name.

---

If you create a caching library (even if it's different from the above suggestion), and you'd
like for it to be officially supported, let us know by
[opening an issue](https://github.com/jmeas/redux-resource/issues/new?title=Caching+library).
We'd be happy to include a caching library to the official repository.
