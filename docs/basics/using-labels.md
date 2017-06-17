# Using Labels

Labels are a way to keep your requests organized. In resourceful-redux, all
resources of the same type are kept in a single Array. This is economical: you
don't have to worry about having multiple versions of the same resource
anywhere. They're all in the same place.

But there are situations when you need to keep track of two different groupings
of the same resource. Often times, these groupings occur because of two
different requests. For instance, if the user runs two searches for books. How
can you keep track of which books were returned from which requests?

You can use labels to do that.

Using a label is straightforward: simply add the `label` property to all of the
requests 
