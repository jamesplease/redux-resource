# Meta

The `meta` section of a resource slice is structured similarly to the `resources` section: it is an object, and each of its keys is a resource ID.

You can store additional information about individual resources within `meta`. You can put anything that you would like here. Typically, the information that you store within `meta` are the things that are useful for the client-side application, but that don't need to be sent to the server.

Resource metadata is intended to solve the problem some developers encounter when they pollute server-side data with client-side data. Mixing the two can get messy. Use metadata to keep things organized.

The following example slice has some metadata, `selected`, associated with two resources. This value could represent that a user has "selected" these resources in the UI.

```javascript
{
  resourceType: 'books',
  meta: {
    4: {
      selected: true
    },
    102: {
      selected: true
    }
  },
  // ...there are other things on a resource slice, too. But this guide will
  // focus on meta.
}
```

## "CRUD" Metadata

Out of the box, Redux Resource sets some metadata on your resources for you. This metadata represents whether or not that particular resource is being created, read, updated, or deleted using a network request. The four values are:

* `createStatus`
* `readStatus`
* `updateStatus`
* `deleteStatus`

The value of each of these properties will be one of the four [request statuses](../requests/statuses.md): `IDLE`, `PENDING`, `SUCCEEDED`, or `FAILED`.

This metadata can be used to track the request status of CRUD operations against a particular resource in some situations. For more, refer to the [Tracking Request Statuses guide](../other-guides/tracking-request-statuses.md).

## Modifying Metadata

There are two ways to modify metadata: synchronously and asynchronously. The guide on [modifying resources](modifying-resources.md) describes both of these approaches.

