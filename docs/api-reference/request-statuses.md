# requestStatuses

An object that represents the four states that a request can be in.

The complete Object is shown below:

```js
{
  NULL: 'NULL',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
}
```

#### Tips

- Although this object can be used to check the status of a request in your
  view layer, it's often more convenient to use [`getStatus`](get-status.md)
  for that purpose. For this reason, we recommend restricting your usage of this
  object to plugins, reducers, or action creators.

  With that said, if you do prefer to use it in your views, then that's quite
  alright, too.
