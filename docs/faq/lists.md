# Lists

#### How can you keep a list in order?

Redux Resource currently only provides lists as a way to keep track
of the initial sort order returned from a single request. As more
requests are made against a single list, it will not respect any
particular order.

If you'd like to maintain ordering of some kind within a specific
list, or all of your lists, then we recommend
[writing a plugin](/docs/guides/plugins.md) to handle that.

#### Can lists be used for keeping track of client-side sorted lists?

Sure. Try it out, and let us know how it goes. If you write something
that works really well, we'd love to add support it as an official plugin
or library!

#### How do you know when to use dynamically-named lists or not?

In the majority of situations, you won't need to use dynamic lists.
For instance, if you are building a banking application that lets a user
display transactions for each of their bank accounts, you might think
to make a list for each one, like this:

`transactionsFor${accountId}`

There are situations when this could be useful. For instance, if you wish
to display the transactions of many bank accounts onscreen at once. Most
applications, though, only let the user see one set of transactions per
account at once. Therefore, it's much better to just use a single list.

`transactionsForAccount`

As the user moves between pages in the application, you can set `mergeListIds`
to `false` to throw away the previous list, and start fresh.

Concerned about caching? Check out [the caching recipe](/docs/recipes/caching.md)
for more.

#### Why is `mergeListIds` set to `true` by default?

There are a few reasons.

1. It's nice that all of the `mergeX` attributes of the CRUD actions are `true` by default.
2. Multiple requests can contribute to a list. For instance, a user may read a list of
  favorites, and then create a new favorite. In this situation, we have multiple requests
  contributing to the same list, so it's good that the resources are merged, rather than
  replaced.

We understand that `mergeListIds` is one of those attributes that you'll frequently be
setting to false. We believe the reasons above justify keeping it `true` by default, but
if you disagree, feel free to
[open an issue](https://github.com/jmeas/redux-resource/issues/new?title=mergeListIds+defaults+to+true)
and we'd be happy to discuss it further with you!