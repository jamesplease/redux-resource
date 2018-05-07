# Custom Action Types

You can add support for additional action types to a [`resourceReducer`](../api-reference/resourcereducer.md) using plugins.

The name 'plugins' may seem intimidating, but don't be worried. Plugins are reducers that you can reuse for any resource slice. If you know how to write a reducer, then you know how to write a plugin.

## Using a Plugin

You define plugins for each resource type when you call [`resourceReducer`](../api-reference/resourcereducer.md). The second argument to that function is an `options` options, and within it you can pass `plugins` as an array:

```javascript
import resourceReducer from 'redux-resource';
import somePlugin from './some-plugin';
import anotherPlugin from './another-plugin';

export default resourceReducer('books', {
  plugins: [somePlugin, anotherPlugin]
});
```

## Writing a Plugin

A plugin is a function that with the following signature:

```javascript
(resourceType, options) => reducerFunction
```

Where `resourceType` and `options` are the arguments that you passed to [`resourceReducer`](../api-reference/resourcereducer.md).

The return value, `reducerFunction`, is also a function. This returned function has the same signature as a Redux reducer:

```javascript
(previousState, action) => newState
```

where `state` is the value of the state after running it through the built-in reducer and `action` is the action that was dispatched.

The simplest plugin then \(which doesn't do anything\), would look like this:

```javascript
function myPlugin(resourceType, options) {
  return function(state, action) {
    return state;
  }
}
```

If you prefer using arrow functions, you might choose to write this like so:

```javascript
const myPlugin = (resourceType, option) => (state, action) => state;
```

This plugin isn't very exciting, so let's look at more realistic examples.

## Selecting Resources

Let's build a plugin that lets a user select resources. The code for this plugin looks like this:

```javascript
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

```javascript
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

## Customizable Plugins

You can write plugins that can be customized per-slice by taking advantage of the fact that the `resourceReducer`'s options are passed into plugins. For instance, if you had a plugin like the following:

```javascript
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

then you could trigger the special behavior by passing `useSpecialBehavior: true` as an option to `resourceReducer`:

```javascript
import resourceReducer from 'redux-resource';
import customizablePlugin from './customizable-plugin';

export default resourceReducer('books', {
  plugins: [customizablePlugin],
  useSpecialBehavior: true
});
```

If this API isn't to your liking, then you can also just wrap the plugin itself in a function, like so:

```javascript
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

```javascript
import resourceReducer from 'redux-resource';
import customizablePlugin from './customizable-plugin';

export default resourceReducer('books', {
  plugins: [
    customizablePlugin({ useSpecialBehavior: true})
  ]
});
```

You may dislike this approach due to the tripley-nested functions. That's fine, because either way works. Use the version that makes the most sense to you.

## Best Practices

Because plugins are so similar to reducers, you can use a `switch` statement and support multiple action types within each plugin. This is usually a good thing, but be mindful of keeping each plugin limited to a single responsibility.

For example, in the above example of a plugin for selecting resources, it supports two Action types – one for selection, and one for deselection. This plugin encapsulates that one responsibility, and it isn't responsible for any other Action types.

We recommend having a plugin for each distinct _responsibility_.

