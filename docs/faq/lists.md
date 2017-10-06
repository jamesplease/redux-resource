# Lists

#### How can you keep a list in order?

Redux Resource currently only provides lists as a way to keep track
of the initial sort order returned from a single request. As more
requests are made against a single list, it will not respect any
particular order.

If you'd like to maintain ordering of some kind within a specific
list, or all of your lists, then I recommend
[writing a plugin](/docs/guides/plugins.md) to handle that.

#### Can lists be used for keeping track of client-side sorted lists?

It's worth trying out. I haven't done that myself, so it could be a
bad idea, but I also don't see any immediate issues with it.

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

Concerned about caching? That shouldn't be done at the list level: we recommend
caching requests instead.
