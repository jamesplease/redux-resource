# Similar Projects

There are several other projects for managing resources in redux. The primary
difference between redux-simple-resource and the other projects is that
redux-simple-resource provides the most detail possible for tracking resource
metadata.

#### [redux-rest-resource](https://github.com/mgcrea/redux-rest-resource)

This library shares the same goals as redux-simple-resource. The primary
difference between the two libraries is that redux-rest-resource's metadata
tracking is more coarse. redux-simple-resource provides per-resource metadata
tracking, while redux-rest-resource merges all metadata for all resources onto a
single property.

For instance, if a user saves two resources simultaneously, you can track those
saves independently using redux-simple-resource, but using redux-rest-resource
you can just tell that at least one resource is being updated.

#### [redux-resources](https://github.com/travisbloom/redux-resources)

This library also has very similar goals as redux-simple-resource. Some of the
major differences that I can see are:

1. your resources are not tracked together in one array. It splits them up based
on the requests that you make. redux-simple-resource tracks all resources of the
same type into a single list

1. it does not provide metadata on a per-resource level
1. it provides timestamps for the operations that you perform out of the box
1. it keeps a cache of errors returned from the server

There may be other differences, too. If there are features of
redux-simple-resource that you would have implemented differently, then you
should try this library out. It might be closer to what you're looking for.

#### [redux-json-api](https://github.com/dixieio/redux-json-api)

redux-json-api requires that your backend adhere to JSON API, whereas
redux-simple-resource will work with a wider range of backends. It provides
reducers, action types, and action creators for you.

It provides less detail about individual resource's metadata than
redux-simple-resource: it stores a single number that counts the number of
concurrent requests of the same type that are in flight, whereas
redux-simple-resource tracks all requests separately.
