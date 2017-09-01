# Similar Projects

This isn't the only library that aims to reduce boilerplate when it comes to
managing resources. Below is a brief comparison between this library and a
handful of others.

Keep in mind that this comparison page is not intended to be complete.
We encourage you to look into other options to determine which is the
best fit for your use case.

#### [redux-rest-resource](https://github.com/mgcrea/redux-rest-resource)

redux-rest-resource does not track metadata on a per-resource basis.
Instead, it merges all metadata for all resources onto a
single property.

Consider, for instance, if a user decides to save two resources simultaneously.
Resourceful Redux will track those two actions independently, but
redux-rest-resource will only track that at least one resource is being saved.

#### [redux-resources](https://github.com/travisbloom/redux-resources)

A short list of things that redux-resources does differently from this library
is:

1. resources are split up in the store based on the requests that you make.
  Resourceful Redux stores all resources of the same type into one object,
  and provides request lists to organize your resources by requests.
1. it does not provide metadata on a per-resource level
1. it provides timestamps for the operations that you perform out of the box
1. it keeps a cache of errors returned from the server out of the box

The features of redux-resources that are not included in Resourceful Redux
would be straightforward to add in via [plugins](../guides/plugins.md).
However, getting the level of detail that Resourceful Redux provides for
requests appears like it would be difficult to achieve using redux-resources.

#### [redux-json-api](https://github.com/dixieio/redux-json-api)

redux-json-api provides less detail about individual resource's metadata than
Resourceful Redux: it stores a single number that counts the number of
concurrent requests of the same type that are in flight, whereas
Resourceful Redux tracks all requests separately.

In addition, redux-json-api requires that your backend adhere to
[JSON API](http://jsonapi.org/). Although Resourceful Redux does not provide a
complete integration with JSON API out of the box, the plugin system would
enable you to add more features such as relationship support.
