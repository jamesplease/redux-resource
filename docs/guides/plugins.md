# Plugins

Plugins are a feature that let you customize the behavior of the resource
reducer. Use plugins to:

- Add support for additional, custom action types
- Change the way the reducer transforms the state in response to the built-in
  action types

### Using a Plugin

You define plugins per-resource when you call
[`resourceReducer`](/docs/api-reference/resource-reducer.md). The second
argument to that function is an `options` options, and within it you can pass
`plugins` as an array:

```js
import resourceReducer from 'resourceful-redux';
import somePlugin from './some-plugin';
import anotherPlugin from './another-plugin';

export default resourceReducer('books', {
  plugins: [somePlugin, anotherPlugin]
});
```

### Writing a Plugin

A plugin is a function that with the following signature:

```js
(resourceName, options) => reducerFunction
```

Where `resourceName` and `options` are the same values that you passed to
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
function myPlugin(resourceName, options) {
  return function(state, action) {
    return state;
  }
}
```

If you prefer using arrow functions, you might choose to write this like so:

```js
const myPlugin = (resourceName, option) => (state, action) => state;
```

This plugin isn't very exciting, so let's look at more realistic examples.

### Custom Action Types

Let's build a plugin that lets a user select resources from a list. The code
for this plugin looks like this:

```js
import { setResourceMeta } from 'resourceful-redux';
import myActionTypes from './my-action-types';

export default function(resourceName, options) {
  return function(state, action) {
    // Ignore actions that were dispatched for another resource type
    if (action.resourceName !== resourceName) {
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
import { resourceReducer } from 'resourceful-redux';
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

Plugins are run **after** the built-in reducer code runs, so you can write
plugins that affect the way the reducer transforms the state for built-in action
types. In the following plugin, we set a property on the store anytime a
successful read occurs:

```js
export default function(resourceName, options) {
  return function(state, action) {
    // Only take action if the resource name of the Action matches the
    // resource this plugin is registered for
    if (action.resourceName !== resourceName) {
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

You can write a plugin that can be customized by taking advantage of the fact
that the `resourceReducer`'s options are passed into plugins. For instance, if
you had a plugin like the following:

```js
export default function customizablePlugin(resourceName, options) {
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
import resourceReducer from 'resourceful-redux';
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
  return function customizablePlugin(resourceName, options) {
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
import resourceReducer from 'resourceful-redux';
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
