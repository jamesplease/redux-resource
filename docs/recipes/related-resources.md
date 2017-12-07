# Related Resources

Endpoints frequently more than one resource type in a single response. For instance,
a request for a single `author` may return that author's `books`, too.

Because different backends return related resources in many different ways,
Redux Resource couldn't possibly include a built-in solution that works for every
API. Instead, [plugins](/docs/guides/plugins.md) can be used to support related resources
in a way that works for for your specific backend.

The rest of this guide will describe supporting related resources for the following
technologies:

- [normalizr](#normalizr)
- [JSON API](#json-api)
- [GraphQL](#graphql)

> Would you like us to include a guide for a technology not listed here? Just
  [open an issue](https://github.com/jmeas/redux-resource/issues/new?title=related%20resource%20plugin&body=I%27d%20like%20to%20see%20a%20related%20resource%20guide%20for%20a%20new%20technology)!

### normalizr

The [Included Resources Plugin](/docs/extras/included-resources-plugin.md) works
well with [normalizr](https://github.com/paularmstrong/normalizr) responses. Refer to
their documentation to familiarize yourself with the API of that plugin.

Here's an example demonstrating using Redux Resource with normalizr:

```js
import {normalize, schema} from 'normalizr';
import store from './store';

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

const originalData = [{
  id: '123',
  author: {
    id: '1',
    name: 'Paul'
  },
  title: 'My awesome blog post',
  comments: [
    {
      id: '324',
      commenter: {
        id: '2',
        name: 'Nicole'
      }
    }
  ]
}];

const normalizedData = normalize(originalData, [article]);

const action = {
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  // We recommend that you use the same string for the `resourceName`, resource slice,
  // and normalizr key.
  resourceName: article.key,
  resources: normalizedData.result,
  includedResources: normalizedData.entities
};

store.dispatch(action);
```

### JSON API

At the moment, the easiest way to support JSON API compound documents is to use
the [jsonapi-normalizr](https://github.com/maxatwork/jsonapi-normalizr) library, and then
follow the normalizr guide above.

An official JSON API plugin is [planned](https://github.com/jmeas/redux-resource/issues/38).
We would love your help!

### GraphQL

We would love to support GraphQL, but we need your help. If you're interested in helping out,
please
[open an issue](https://github.com/jmeas/redux-resource/issues/new?title=GraphQL%20plugin&body=I%27m%20interested%20in%20helping%20out%20with%20a%20GraphQL%20plugin)
to chat about it. Thank you!