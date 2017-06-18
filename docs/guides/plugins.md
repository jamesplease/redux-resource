# Plugins

Plugins are a feature that let you customize the behavior of the resource
reducer. Use plugins to:

- Add support for custom action types
- Add or change the way the reducer responds to the built-in action types

### Writing a Plugin

Writing a plugin is very similar to writing a reducer. Plugins are functions
that have the following signature: `(state, action, options)`, where `state` is
the current state, `action` is the action that was dispatched, and `options` are
the `options` that were passed into
[`resourceReducer`](../api-reference/resource-reducer.md).

A plugin must always return the new state.

Because a plugin is intended to be generic, you will often wrap your plugins
in a function that you call with the resource that the plugin is for. This
lets you scope the plugin to a specific resource. Otherwise, any time that you
fire a particular Action type, _all_ of the resources in your state tree would
be affected!

### Custom Action Types

Let's build a plugin that lets a user select resources from a list. The code
for this plugin looks like this:

```js
import { setResourceMeta } from 'resourceful-redux';
import myActionTypes from './my-action-types';

export default function(resourceName) {
  return function(state, action, options) {
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
      plugins: [
        selectResources('books')
      ]
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
export default function(resourceName) {
  return function(state, action, options) {
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

### Best Practices

Because plugins are so similar to reducers, you can use a `switch` statement
and support multiple action types within each plugin. This is usually a
good thing, but be mindful of keeping each plugin limited to a single
responsibility.

For example, in the above example of a plugin for selecting resources, it
supports two Action types – one for selection, and one for deselection. This
plugin encapsulates that one responsibility, and it isn't responsible for any
other Action types.

We recommend having a plugin for each distinct responsibility.
