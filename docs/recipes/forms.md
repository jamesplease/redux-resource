# Forms

Redux Resource complements, but does not replace, form libraries for React.
If you're already using a form library, we encourage you to continue using it alongside
Redux Resource.

### Recommendations

We've had great success using [react-redux-form](https://github.com/davidkpiano/react-redux-form)
with Redux Resource, although [Redux Form](https://github.com/erikras/redux-form) is also worth
considering.

No matter what form library you go with, it should work well with Redux Resource.

### Usage Guidance

We've had luck using forms in the following way:

1. When the form mounts, we grab the resource that the user will be modifying from the Redux Resource
  slice. We use that resource to hydrate the form data. If you're using React Redux Form, this would mean
  using
  [`actions.change`](https://davidkpiano.github.io/react-redux-form/docs/api/actions.html#actions-change)
  to update the form's model.
2. At this point, the user can enter data, and you would use the form library like usual.
3. When it's time to submit the form, you can serialize the form data into a format that 
  can be passed into a Redux Resource action. Typically, you would pass some version of the
  data into a create or update action creator.
4. Redux Resource will automatically update your resource slice appropriately, and you're on
  your way.

### Including Form Data into Redux Resource Slices

Folks have asked if it's alright to place form data in a resource slice. Sure, I think so.
I would recommend keeping the `resources` object as the last known representation of the
resources from your server, and keeping a "working copy" of the resources elsewhere.

There are two downsides to doing this:

1. It couples your form implementation to Redux Resource, when it isn't necessary to do so
2. Great libraries for handling Redux forms already exist! You'll want to make sure that what
  you get from writing your own is worth the effort.

If you decide to do something like this, let us know! We'd love to check it out.