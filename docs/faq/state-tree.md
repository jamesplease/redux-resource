# State tree

#### Can I store additional metadata for resources within `meta`?

You can, and we encourage it. We recommend that you avoid changing the values of
the request statuses directly (use the built-in Action types to do this), but
feel free to store anything else in there that you want.

The best way to add support for custom metadata is by writing
[plugins]('../guides/plugins.md') to add support custom Action types in a
resource's reducer.

#### Can I store additional properties on each state slice?

Yes, you can. The only requirement is that you don't change the structure of the
state that you start out with: make sure that `resources`, `meta`, `lists`, and
`requests` remain Objects. If you stick with that you shouldn't run into any issues.

As a convention, we recommend only storing data relevant to the resource in the
slice. Use another slice for other information.

#### Can I store more than one resource per state slice?

We don't recommend doing this right now, but that's just because the library
isn't built to support it. If you have a compelling use case for this feature,
let us know by
[opening an issue](https://github.com/jamesplease/redux-resource/issues/new) about
it.
