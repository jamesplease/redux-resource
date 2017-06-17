# Using Labels

Labels are a way to keep your requests organized. In resourceful-redux, all
resources of the same type are kept in a single Array. This solves the problem
of having multiple copies of a resource in two different places: each resource
can be found in exactly one place in the store.

But there are situations when you need to keep track of two different groupings
of the same resource. Often times, these groupings occur because of two
different requests. For instance, if the user runs two searches for books. How
can you keep track of which books were returned from which requests?

You can use labels to do that.

Using a label is straightforward: simply add the `label` property to all of the
requests
