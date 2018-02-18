# Plugins

Plugins are a way to add or change the behavior of a
[`resourceReducer`](/docs/api-reference/resource-reducer.md).

There are two main use cases for plugins:

1. adding additional functionality to the reducer, such as custom action types

2. extending the behavior of the reducer for the built-in action types

#### Adding Additional Functionality

You will often want to use more action types than the built-in action types.
For instance, if your interface allows users to "select" resources with
checkboxes, then you want may to add support for some selection action types.

Plugins allow you to add support for custom action types to support features
like this.

#### Extending Built-in Action Types

The notion of a "request" in Redux Resource is intentionally generic. It's
not tied to any specific protocol, such as HTTP. What this means is that when
a request fails, the _only_ information that you have is that the request
failed, and not that it failed with, say, a 404 status code. That's because 404
status codes are a feature of HTTP requests. Consequently, if you're using HTTP
requests, then you'll likely want to use a plugin to give you more information
about the requests that you make.

Similarly, if you're using GRPC, or some other system, then you'll want a plugin
to give you more information about those types of requests and responses.

Furthermore, if you're using a system like JSON API, then you can use plugins to
add support for features such as relationships or response metadata.

There's [an official HTTP Status Codes plugin](/docs/extras/http-status-codes-plugin.html)
that makes working with HTTP requests even better.

Officially maintained plugins for other common protocols are on our to do list, but
in the meantime, we've done our best to make it straightforward to write your own.

### Using a Plugin

You define plugins per-resource when you call
[`resourceReducer`](/docs/api-reference/resource-reducer.md). The second
argument to that function is an `options` options, and within it you can pass
`plugins` as an array:

```js
import resourceReducer from 'redux-resource';
import somePlugin from './some-plugin';
import anotherPlugin from './another-plugin';

export default resourceReducer('books', {
  plugins: [somePlugin, anotherPlugin]
});
```

### Writing a Plugin

A plugin is a function that with the following signature:

```js
(resourceType, options) => reducerFunction
```

Where `resourceType` and `options` are the same values that you passed to
[`resourceReducer`](/docs/api-reference/resource-reducer.md).

The return value, `reducerFunction`, is also a function. This returned function
has the same signature as a Redux reducer:

```js
(previousState, action) => newState
```

where `state` is the value of the state after running it through the built-in
reducer and `action` is the action that was dispatched.

The simplest plugin then (which doesn't do anything), would look like this:

```js
function myPlugin(resourceType, options) {
  return function(state, action) {
    return state;
  }
}
```

If you prefer using arrow functions, you might choose to write this like so:

```js
const myPlugin = (resourceType, option) => (state, action) => state;
```

This plugin isn't very exciting, so let's look at more realistic examples.

### Custom Action Types

Let's build a plugin that lets a user select resources from a list. The code
for this plugin looks like this:

```js
import { setResourceMeta } from 'redux-resource';
import myActionTypes from './my-action-types';

export default function(resourceType, options) {
  return function(state, action) {
    // Ignore actions that were dispatched for another resource type
    if (action.resourceType !== resourceType) {
      return state;
    }

    if (action.type === myActionTypes.SELECT_RESOURCES) {
      return {
        ...state,
        meta: setResourceMeta({
          resources: action.resources,
          meta: state.meta,
          newMeta: {
            selected: true
          },
          initialResourceMeta: options.initialResourceMeta
        })
      };
    } else if (action.type === myActionTypes.UNSELECT_RESOURCES) {
      return {
        ...state,
        meta: setResourceMeta({
          resources: action.resources,
          meta: state.meta,
          newMeta: {
            selected: false
          },
          initialResourceMeta: options.initialResourceMeta
        })
      };
    } else {
      return state;
    }
  }
}
```

You would then use this plugin like so:

```js
import { createStore, combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';
import selectResources from './plugins/select-resources';

let store = createStore(
  combineReducers({
    books: resourceReducer('books', {
      plugins: [selectResources]
    }),
  })
);
```

### Changing Built-In Action Type behavior

Interestingly, the built-in behavior of Redux Resource is itself just a plugin.

Additional plugins are run **after** this built-in plugin runs, so you can write
plugins that make further adjustments to the state after the built-in plugin. In
the following plugin, we set a property on the store anytime a successful read
occurs:

```js
export default function(resourceType, options) {
  return function(state, action) {
    // Only take action if the resource name of the Action matches the
    // resource this plugin is registered for
    if (action.resourceType !== resourceType) {
      return state;
    }

    if (action.type === 'READ_RESOURCES_SUCCEEDED') {
      return {
        ...state,
        readSucceeded: true
      };
    } else {
      return state;
    }
  };
}
```

### Customizable Plugins

You can write plugins that can be customized per-slice by taking advantage of
the fact that the `resourceReducer`'s options are passed into plugins. For
instance, if you had a plugin like the following:

```js
export default function customizablePlugin(resourceType, options) {
  return function(state, action) {
    if (options.useSpecialBehavior) {
      // Perform a computation
    } else {
      // Do some other computation here
    }
  };
}
```

then you could trigger the special behavior by passing
`useSpecialBehavior: true` as an option to `resourceReducer`:

```js
import resourceReducer from 'redux-resource';
import customizablePlugin from './customizable-plugin';

export default resourceReducer('books', {
  plugins: [customizablePlugin],
  useSpecialBehavior: true
});
```

If this API isn't to your liking, then you can also just wrap the plugin itself
in a function, like so:

```js
export default function(pluginOptions) {
  return function customizablePlugin(resourceType, options) {
    return function(state, action) {
      if (pluginOptions.useSpecialBehavior) {
        // Perform a computation
      } else {
        // Do some other computation here
      }
    };
  };
}
```

which would be used in the following way:

```js
import resourceReducer from 'redux-resource';
import customizablePlugin from './customizable-plugin';

export default resourceReducer('books', {
  plugins: [
    customizablePlugin({ useSpecialBehavior: true})
  ]
});
```

You may dislike this approach due to the tripley-nested functions. That's fine,
because either way works. Use the version that makes the most sense to you.

### Best Practices

Because plugins are so similar to reducers, you can use a `switch` statement
and support multiple action types within each plugin. This is usually a
good thing, but be mindful of keeping each plugin limited to a single
responsibility.

For example, in the above example of a plugin for selecting resources, it
supports two Action types – one for selection, and one for deselection. This
plugin encapsulates that one responsibility, and it isn't responsible for any
other Action types.

We recommend having a plugin for each distinct _responsibility_.
