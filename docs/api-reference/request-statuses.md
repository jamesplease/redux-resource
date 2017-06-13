# requestStatuses

An Object that represents the four states that a request can be in.

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

- Although this can be used to check the current status of a request, it's often
  more convenient to use [`getStatus`](get-status.md).
