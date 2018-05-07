# Forms

Redux Resource complements, but does not replace, form libraries. If you're already using a form library, we encourage you to continue using it alongside Redux Resource.

## Recommendations

The following are two popular forms libraries for Redux:

* [react-redux-form](https://github.com/davidkpiano/react-redux-form)
* [redux-form](https://github.com/erikras/redux-form)

Using component state for form data is also worth considering. However you decide to manage your form data, it should work well alongside Redux Resource.

## Using Resource Slices

You can also store form information inside of the resource slice. A Redux best practice is to separate your client-side data separate from your server-side data, so form information should be kept separate from the actual resource objects themselves.

Instead, you might choose to use [`meta`](../resources/meta.md) for form information, or perhaps an additional "top-level" key within the resource slice, such as `forms`.

One thing to consider before going with this approach is whether or not your form allows a user to modify more than one resource at a time. If it does, then you may want to consider storing the form data outside of an individual resource slice.

