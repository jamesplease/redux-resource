# redux-simple-resource

A powerful Redux system for interacting with remote resources.

[![Travis build status](http://img.shields.io/travis/jmeas/redux-simple-resource.svg?style=flat)](https://travis-ci.org/jmeas/redux-simple-resource)

### What is a simple resource?

By "simple," I mean resources that do not have a formal definition of a
relationship with one another. In redux-simple-resource, the notion of a
compound document (a response containing more than one resource) isn't built in,
although you could add that in yourself.

Most APIs do not have formal definitions of relationships, and therefore do not
have the concept of a compound document that could be used in a systematic way.

An example of a system that _does_ provide a formal relationship definition is
[JSON API]((http://jsonapi.org/)). If your endpoints adhere to JSON API, then
you still could use simple-resource, but you could also use a system that gets
you more by building in support for compound documents automatically.

For most APIs, redux-simple-resource should be a perfect fit.
