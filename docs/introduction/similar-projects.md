# Similar Projects

There are several other projects for managing resources in redux. Below
is a brief comparison between this library and a handful of others.

Keep in mind that this comparison page is not intended to be complete.
We encourage you to look into other options to determine which is the
best fit for your use case.

#### [redux-rest-resource](https://github.com/mgcrea/redux-rest-resource)

redux-rest-resource does not track metadata on a per-resource basis.
Instead, it merges all metadata for all resources onto a
single property.

For instance, if a user saves two resources simultaneously, you can track those
saves independently using resourceful-redux, but using redux-rest-resource
you can just tell that at least one resource is being updated.

#### [redux-resources](https://github.com/travisbloom/redux-resources)

Some major differences between this library and resourceful-redux are:

1. resources are split up in the store based on the requests that you make.
  resourceful-redux tracks all resources of the same type into a single list
1. it does not provide metadata on a per-resource level
1. it provides timestamps for the operations that you perform out of the box
1. it keeps a cache of errors returned from the server out of the box

The features of redux-resources that are not included in resourceful-redux
would be straightforward to add in via plugins. However, getting the level
of detail that resourceful-redux provides for requests would be difficult
to achieve when using redux-resources.

#### [redux-json-api](https://github.com/dixieio/redux-json-api)

redux-json-api provides less detail about individual resource's metadata than
resourceful-redux: it stores a single number that counts the number of
concurrent requests of the same type that are in flight, whereas
resourceful-redux tracks all requests separately.

However, it does provide action creators out of the box for you, whereas
resourceful-redux does not provide action creators at the moment.

In addition, redux-json-api requires that your backend adhere to JSON API. Although
resourceful-redux does not provide a complete integration with JSON API out of the box,
the plugin system would enable you to add more features such as relationship support.
