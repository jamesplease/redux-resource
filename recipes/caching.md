# Caching

Caching server responses can improve the responsiveness of your application.

Because the main Redux Resource library does not provide tools to make HTTP requests, it is not possible for the main library to provide a caching mechanism.

With that said, bindings for view libraries, such as React, are the perfect place for caching to be implemented. Official React bindings for Redux Resource are in the works, and they will be built using [React Request](https://github.com/jamesplease/react-request), a powerful, declarative HTTP library for React.

This recipe contains tips that could help you if you're interested in writing your own caching implementation, either by using React Request or by writing your own system.

## Caching using requests

How can you know if a response has already been returned for a given request? The way that we recommend doing it is by using [request objects](../requests/request-objects.md).

Here's how it works with React Request:

React Request implements its own [caching system](https://github.com/jamesplease/react-request/blob/master/docs/guides/response-caching.md). Its caching is powered by a string called a ["request key"](https://github.com/jamesplease/react-request/blob/master/docs/guides/request-keys.md) based on the request configuration you pass to it. Two requests with the same key are considered identical.

This automatically-generated "request key" will be used as the Redux Resource requestKey, which is what ties the two libraries together.

## Accessing data from a dynamic key

Tools like `getStatus` are more difficult to use directly when using a dynamic request name.

In the official React bindings for Redux Resource, the solution to this problem will be a wrapping component _around_ React Request will automatically pull the details of that request from the Redux store, and pass it to you in a render prop function. It will also pull the resources, resource meta, and lists that the request affected.

Because of this, you will rely a lot less on directly using `getStatus` and `getResources` when using React Redux Resource, although they will still be there should you need them.

## The role of lists

Sometimes, requests contribute to a list. For instance, if you fetch a user's favorite books, and then they create a new favorite book, you may have a list called `"favoriteBooks"`, which is what your component renders out.

What do you do in this situation? Simply continue to cache at the request level.

By using a cached response, you are making the claim that a response from the server for that request could not provide any more information for the list that you already have.

As a result, you do not make the request, and you continue to render out the locally-cached list.

